import json
import os
# import uuid # Not currently needed

# --- Configuration ---
# Use the output from the last script run (v5) as input here
input_filename = "PYQ_Questions_final.json"
# Generate a new output file name for the fully normalized & mapped data
output_filename = "PYQ_Questions_final_mapped.json"
options_field = "Options"
correct_answers_field = "CorrectAnswers"
# --- End Configuration ---

def normalize_option(option_data, index):
    """
    Ensures an option element is a dictionary with 'id' ('A', 'B', 'C'...) and 'text'.
    Handles dicts (fills missing keys) and strings (creates dict).
    """
    generated_id = ""
    if 0 <= index < 26: # Covers A-Z
         generated_id = chr(65 + index) # ASCII 65 is 'A'
    else:
        print(f"Warning: Option index {index} >= 26. Using numeric ID 'opt_{index + 1}'.")
        generated_id = f"opt_{index + 1}"

    if isinstance(option_data, dict):
        original_id = str(option_data.get("id", "")).strip()
        original_text = str(option_data.get("text", "")).strip()
        # Use generated A,B,C... only if original ID was missing or empty
        final_id = original_id if original_id else generated_id
        return {"id": final_id, "text": original_text}
    elif isinstance(option_data, str):
        # Convert string option to dict format
        # print(f"  Info: Converting string option '{option_data[:30]}...' to object ID '{generated_id}' idx {index}.")
        return {"id": generated_id, "text": option_data}
    else:
        print(f"Warning: Skipping unexpected type '{type(option_data)}' in options array: {str(option_data)[:50]}")
        return None # Skip this element

def map_answer_index_to_letter(answer_str):
    """
    Attempts to convert a number string ('1','2'...) to a letter ('A','B'...).
    Keeps original string if not convertible or not in range 1-26.
    """
    try:
        index_num = int(answer_str)
        if 1 <= index_num <= 26:
            return chr(64 + index_num) # 1 -> 'A', 2 -> 'B', ...
        else:
            return answer_str # Keep original if out of A-Z range
    except (ValueError, TypeError):
        return answer_str # Keep original if it wasn't a number string (e.g., already "A")

def fix_normalize_map_json(infile, outfile, options_key, answers_key):
    """
    Reads JSON, fixes stringified fields, normalizes options content,
    ensures answers are strings, and maps numeric answers to letters for MCQs.
    """
    if not os.path.exists(infile): print(f"Error: Input file not found: '{infile}'"); return
    print(f"Reading data from '{infile}'...")
    try:
        with open(infile, 'r', encoding='utf-8') as f: data = json.load(f)
    except Exception as e: print(f"Error reading/parsing file '{infile}': {e}"); return
    if not isinstance(data, list): print(f"Error: Expected input JSON '{infile}' to be a list."); return

    print(f"Processing, normalizing, and mapping {len(data)} records...")
    records_modified_count = 0

    for i, item in enumerate(data):
        if not isinstance(item, dict): print(f"Warning: Skipping item at index {i}, not dict."); continue

        item_modified_flag = False
        original_options = item.get(options_key) # Store original options value for later check
        original_answers = item.get(answers_key) # Store original answers value for later check

        # --- 1. Process Options (Normalize content - logic from v5) ---
        options_list = None
        parsed_options_from_string = False
        if options_key in item:
            # (This block is identical to v5 - fixes stringified options and normalizes elements)
            options_value = item[options_key]
            if isinstance(options_value, str):
                try:
                    processed_str = options_value.replace('\\', '\\\\'); options_list = json.loads(processed_str)
                    item_modified_flag = True; parsed_options_from_string = True
                except Exception as e: print(f"Warn: Rec {i+1} '{options_key}' string parse fail. Skip norm. Err:{e}. Val:'{options_value[:60]}...'"); options_list = None
            elif isinstance(options_value, list): options_list = options_value
            elif options_value is None: options_list = []; # Treat null as empty list only if it was actually null
            else: print(f"Warn: Rec {i+1} '{options_key}' unexpected type '{type(options_value)}'. Skip."); options_list = None

            if isinstance(options_list, list):
                normalized_options_list = []
                list_structure_changed = False
                for idx, element in enumerate(options_list):
                    normalized_element = normalize_option(element, idx)
                    if normalized_element is not None: normalized_options_list.append(normalized_element)
                    if str(normalized_element) != str(element): list_structure_changed = True # Check if norm changed anything
                # Update if parsed from string OR if internal structure changed
                if parsed_options_from_string or list_structure_changed:
                    item[options_key] = normalized_options_list
                    item_modified_flag = True


        # --- 2. Process CorrectAnswers ---
        answers_list_str = None # This will hold the list *after* ensuring elements are strings
        if answers_key in item:
            answers_value = item[answers_key]
            parsed_answers_from_string = False

            # A. Fix stringified CorrectAnswers first
            if isinstance(answers_value, str):
                 try:
                    processed_str = answers_value.replace('\\', '\\\\')
                    parsed_answers = json.loads(processed_str)
                    if isinstance(parsed_answers, list):
                         answers_list_str = [str(ans) for ans in parsed_answers] # Ensure strings
                         item_modified_flag = True; parsed_answers_from_string = True
                    else: print(f"Warn: Rec {i+1} '{answers_key}' JSON in string not list. Type:{type(parsed_answers)}. Keep orig.")
                 except Exception as e: print(f"Warn: Rec {i+1} '{answers_key}' string parse fail. Err:{e}. Val:'{answers_value[:60]}...'")
            elif isinstance(answers_value, list):
                 # B. Ensure elements are strings even if already a list
                 stringified_list = [str(ans) for ans in answers_value]
                 # Check if conversion to string changed anything
                 if json.dumps(stringified_list) != json.dumps(answers_value):
                     item_modified_flag = True
                 answers_list_str = stringified_list # Work with the list of strings
            elif answers_value is None:
                 answers_list_str = [] # Treat null as empty list
                 if item[answers_key] is not None: item_modified_flag = True
            else: print(f"Warn: Rec {i+1} '{answers_key}' unexpected type '{type(answers_value)}'. Skip.")

            # C. Map numbers to letters if it's an MCQ and we have a valid list of strings
            # Check using the potentially updated 'Options' field in 'item'
            is_mcq_with_options = (options_key in item and isinstance(item[options_key], list) and len(item[options_key]) > 0)

            if isinstance(answers_list_str, list) and is_mcq_with_options:
                mapped_answers = [map_answer_index_to_letter(ans_str) for ans_str in answers_list_str]
                # Update if mapping changed something OR if we modified the list earlier
                if json.dumps(mapped_answers) != json.dumps(answers_list_str) or item_modified_flag:
                    item[answers_key] = mapped_answers
                    item_modified_flag = True
            elif isinstance(answers_list_str, list) and not parsed_answers_from_string and not is_mcq_with_options:
                # If not MCQ and not parsed from string, still might need to update if elements were stringified
                 if json.dumps(answers_list_str) != json.dumps(answers_value):
                      item[answers_key] = answers_list_str
                      item_modified_flag = True


        # --- Update modification count ---
        if item_modified_flag:
            # Check if item actually changed compared to start (more robust)
            # This requires storing original item or comparing dicts, maybe too complex here.
            # Let's rely on the item_modified_flag for now.
            records_modified_count += 1

    # ... writing output file ...
    print(f"Finished processing {len(data)} records.")
    print(f"Writing final data to '{outfile}'...")
    try:
        with open(outfile, 'w', encoding='utf-8') as f: json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Successfully wrote final file '{outfile}'.")
        print(f"Total records with modifications: {records_modified_count}")
    except Exception as e: print(f"Error writing output file '{outfile}': {e}")

# --- Run the function ---
if __name__ == "__main__":
    fix_normalize_map_json(input_filename, output_filename, options_field, correct_answers_field)