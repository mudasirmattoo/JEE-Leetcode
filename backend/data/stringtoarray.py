# import json
# import os

# # --- Configuration ---
# input_filename = "PYQ_Questions.json"
# output_filename = "PYQ_Questions_corrected.json"
# fields_to_fix = ["Options", "CorrectAnswers"]
# # --- End Configuration ---

# def fix_stringified_json_in_file(infile, outfile, fields):
#     if not os.path.exists(infile):
#         print(f"Error: Input file not found at '{infile}'")
#         return

#     print(f"Reading data from '{infile}'...")
#     try:
#         with open(infile, 'r', encoding='utf-8') as f:
#             data = json.load(f)
#     except json.JSONDecodeError as e:
#         print(f"Error: Failed to parse input JSON file '{infile}': {e}")
#         return
#     except Exception as e:
#         print(f"Error reading file '{infile}': {e}")
#         return

#     if not isinstance(data, list):
#         print(f"Error: Expected input JSON file '{infile}' to contain a list of objects.")
#         return

#     print(f"Processing {len(data)} records...")
#     modified_count = 0
#     processed_count = 0

#     for i, item in enumerate(data):
#         processed_count += 1
#         if not isinstance(item, dict):
#             print(f"Warning: Skipping item at index {i} as it's not an object (dict).")
#             continue

#         for field in fields:
#             if field in item:
#                 value = item[field]

#                 if isinstance(value, str):
#                     try:
#                         # --- Attempt to fix unescaped backslashes ---
#                         # Replace single backslashes with double backslashes
#                         # This helps json.loads parse strings containing things like \n, \t, or LaTeX backslashes
#                         processed_value_str = value.replace('\\', '\\\\')
#                         # --- End pre-processing ---

#                         # Attempt to load the *processed* string's content as JSON
#                         parsed_value = json.loads(processed_value_str)

#                         # If successful, replace the original string
#                         item[field] = parsed_value
#                         modified_count += 1
#                         # print(f"Record {i+1}: Successfully parsed and replaced field '{field}'.")

#                     except json.JSONDecodeError as e:
#                         # Parsing still failed, even after trying to fix backslashes.
#                         print(f"Warning: Record {i+1}: Field '{field}' failed JSON parsing after attempting escape fixes. Error: {e}. Keeping original value: '{value[:80]}...'")
#                     except Exception as e:
#                          print(f"Warning: Unexpected error processing field '{field}' in record {i+1}: {e}")

#     print(f"Finished processing {processed_count} records.")

#     print(f"Writing potentially corrected data to '{outfile}'...")
#     try:
#         with open(outfile, 'w', encoding='utf-8') as f:
#             json.dump(data, f, indent=4, ensure_ascii=False)
#         print(f"Successfully wrote corrected file '{outfile}'.")
#         print(f"Total fields checked and replaced because they contained valid JSON within a string: {modified_count}")
#     except Exception as e:
#         print(f"Error writing output file '{outfile}': {e}")

# # --- Run the function ---
# if __name__ == "__main__":
#     fix_stringified_json_in_file(input_filename, output_filename, fields_to_fix)

import json
import os
import uuid # Keep for potential alternative unique IDs if needed later

# --- Configuration ---
# Use the output from the last script run as input here
input_filename = "PYQ_Questions_corrected.json"
# Generate a new output file name for the fully normalized data
output_filename = "PYQ_Questions_final.json" # Renamed output
options_field = "Options"
correct_answers_field = "CorrectAnswers"
# --- End Configuration ---

def normalize_option(option_data, index):
    """
    Ensures an option element is a dictionary with 'id' ('A', 'B', 'C'...) and 'text'.
    Converts strings to dicts, fills missing/empty keys in existing dicts using letter IDs.
    """
    # --- Generate Letter ID based on index (A=0, B=1, etc.) ---
    generated_id = ""
    if 0 <= index < 26: # Covers A-Z
         generated_id = chr(65 + index) # ASCII 65 is 'A'
    else:
        # Fallback for more than 26 options (unlikely for standard MCQs)
        print(f"Warning: Option index {index} is beyond 25 ('Z'). Using numeric ID 'opt_{index + 1}'.")
        generated_id = f"opt_{index + 1}"
    # --- End ID Generation ---

    if isinstance(option_data, dict):
        # It's already an object. Get existing values, default to empty string.
        original_id = str(option_data.get("id", "")).strip()
        original_text = str(option_data.get("text", "")).strip()

        # Use the generated A, B, C... ID *only if* the original ID was missing or empty.
        final_id = original_id if original_id else generated_id

        return {"id": final_id, "text": original_text}

    elif isinstance(option_data, str):
        # It's a plain string. Convert it to the standard dict format using the generated ID.
        print(f"  Info: Converting string option '{option_data[:30]}...' to object with ID '{generated_id}' at index {index}.")
        return {"id": generated_id, "text": option_data}
    else:
        # Unexpected type within the array (e.g., number, null). Log and skip.
        print(f"Warning: Skipping unexpected data type '{type(option_data)}' within options array: {str(option_data)[:50]}")
        return None # Signal to skip

def fix_and_normalize_json(infile, outfile, options_key, answers_key):
    """
    Reads JSON, fixes stringified fields, and normalizes the internal
    structure of the options array using letter IDs (A, B, C...).
    """
    if not os.path.exists(infile):
        print(f"Error: Input file not found at '{infile}'")
        return

    print(f"Reading data from '{infile}'...")
    try:
        with open(infile, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse input JSON file '{infile}': {e}")
        return
    except Exception as e:
        print(f"Error reading file '{infile}': {e}")
        return

    if not isinstance(data, list):
        print(f"Error: Expected input JSON file '{infile}' to contain a list.")
        return

    print(f"Processing and normalizing {len(data)} records...")
    records_modified_count = 0

    for i, item in enumerate(data):
        if not isinstance(item, dict):
            print(f"Warning: Skipping item at index {i}, not a dictionary.")
            continue

        item_modified_flag = False

        # --- Process Options ---
        if options_key in item:
            options_value = item[options_key]
            options_list = None
            parsed_from_string = False

            # 1. Handle stringified JSON first
            if isinstance(options_value, str):
                try:
                    processed_str = options_value.replace('\\', '\\\\')
                    options_list = json.loads(processed_str)
                    item_modified_flag = True
                    parsed_from_string = True # Mark that we parsed from string
                    # print(f"  Info: Record {i+1}: Parsed stringified '{options_key}'.")
                except json.JSONDecodeError as e:
                    print(f"Warning: Record {i+1}: Field '{options_key}' is a string but failed JSON parsing. Skipping normalization. Error: {e}. Value: '{options_value[:60]}...'")
                    options_list = None
            elif isinstance(options_value, list):
                options_list = options_value
            elif options_value is None:
                options_list = []
                if item[options_key] is not None: item_modified_flag = True
            else:
                 print(f"Warning: Record {i+1}: Field '{options_key}' has unexpected type '{type(options_value)}'. Skipping.")
                 options_list = None

            # 2. Normalize the Options List Content
            if isinstance(options_list, list):
                normalized_options_list = []
                list_structure_changed = False
                for idx, element in enumerate(options_list):
                    # Normalize each element using the updated helper
                    normalized_element = normalize_option(element, idx)
                    if normalized_element is not None:
                        normalized_options_list.append(normalized_element)
                        # Rough check if normalization changed anything
                        if str(normalized_element) != str(element):
                             list_structure_changed = True
                    else:
                        list_structure_changed = True # Element was skipped

                # Update the item if we parsed from string OR if normalization changed structure
                if parsed_from_string or list_structure_changed:
                    item[options_key] = normalized_options_list
                    item_modified_flag = True

        # --- Process CorrectAnswers (simpler: just fix stringified) ---
        if answers_key in item:
             # (Logic for CorrectAnswers remains the same as v4 - checking if string, parsing, assigning back)
             answers_value = item[answers_key]
             if isinstance(answers_value, str):
                  try:
                     processed_str = answers_value.replace('\\', '\\\\')
                     parsed_answers = json.loads(processed_str)
                     if isinstance(parsed_answers, list):
                          stringified_answers = [str(ans) for ans in parsed_answers]
                          # Convert original string (approximated by dumping list) to compare
                          original_as_dumped = json.dumps(json.loads(processed_str)) if not processed_str.startswith('"') else processed_str # Handle simple string case "[\"A\"]"
                          current_dumped = json.dumps(stringified_answers)

                          if original_as_dumped != current_dumped:
                              item[answers_key] = stringified_answers
                              item_modified_flag = True
                              # print(f"  Info: Record {i+1}: Parsed stringified '{answers_key}'.")
                     else:
                          print(f"Warning: Record {i+1}: Field '{answers_key}' contained JSON but not a list. Type: {type(parsed_answers)}. Keeping original.")
                  except json.JSONDecodeError as e:
                     print(f"Warning: Record {i+1}: Field '{answers_key}' failed JSON parsing from string. Error: {e}. Keeping original. Value: '{answers_value[:60]}...'")


        if item_modified_flag:
            records_modified_count += 1

    print(f"Finished processing {len(data)} records.")

    # --- Write Output ---
    print(f"Writing normalized data to '{outfile}'...")
    try:
        with open(outfile, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Successfully wrote normalized file '{outfile}'.")
        print(f"Total records with modifications: {records_modified_count}")
    except Exception as e:
        print(f"Error writing output file '{outfile}': {e}")

# --- Run the function ---
if __name__ == "__main__":
    fix_and_normalize_json(input_filename, output_filename, options_field, correct_answers_field)