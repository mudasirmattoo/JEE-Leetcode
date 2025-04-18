# import os
# import json
# import shutil
# import re

# def update_json(json_path, question_num, year, date, slot, relative_path, option_paths):
#     with open(json_path, "r", encoding="utf-8") as f:
#         questions = json.load(f)

#     index = int(question_num) - 1  # Assuming order in JSON matches Q.No.
#     if index < 0 or index >= len(questions):
#         print("❌ Invalid question number.")
#         return

#     questions[index]["ImagePath"] = relative_path.replace("\\", "/")

#     # Optionally add option image paths
#     if option_paths:
#         questions[index]["OptionImagePaths"] = {
#             k: v.replace("\\", "/") for k, v in option_paths.items()
#         }

#     with open(json_path, "w", encoding="utf-8") as f:
#         json.dump(questions, f, indent=2)
    
#     print(f"✅ Updated Question #{question_num} in JSON.")

# def main():
#     print("📌 PYQ Image Attacher\n")

#     image_path = input("Enter full path to main question image: ").strip()

#     if not os.path.exists(image_path):
#         print("❌ Image does not exist.")
#         return

#     # Extract metadata from filename using regex
#     filename = os.path.basename(image_path)
#     match = re.match(r"(j\d+)_([a-z]+\d+)_([1-2])_(\d+)\.png", filename, re.IGNORECASE)
    
#     if not match:
#         print("❌ Filename format incorrect.")
#         return
    
#     year, date, slot, qno = match.groups()
#     year = year.lower()
#     date = date.lower()
#     slot = f"slot{slot}"

#     # Prepare destination
#     project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
#     media_dir = os.path.join(project_root, "media", year, date, slot)
#     os.makedirs(media_dir, exist_ok=True)

#     dest_question_path = os.path.join(media_dir, filename)
#     shutil.copy2(image_path, dest_question_path)
#     rel_path = os.path.relpath(dest_question_path, project_root)
#     print(f"✅ Moved main image → {rel_path}")

#     # Now check for option images
#     option_letters = ["A", "B", "C", "D"]
#     option_paths = {}

#     for opt in option_letters:
#         opt_filename = f"{year}_{date}_{slot[-1]}_{qno}_{opt}.png"
#         opt_source_path = os.path.join(os.path.dirname(image_path), opt_filename)
#         if os.path.exists(opt_source_path):
#             opt_dest_path = os.path.join(media_dir, opt_filename)
#             shutil.copy2(opt_source_path, opt_dest_path)
#             rel_opt_path = os.path.relpath(opt_dest_path, project_root)
#             option_paths[opt] = rel_opt_path
#             print(f"✅ Found & moved option image {opt} → {rel_opt_path}")

#     # Update JSON
#     json_path = os.path.join(project_root, "data", "PYQ_Questions.json")
#     update_json(json_path, qno, year, date, slot, rel_path, option_paths)

# if __name__ == "__main__":
#     main()

# 2nd 
# import os
# import json
# import shutil
# import re

# def update_json(json_path, question_num, relative_path, option_paths):
#     with open(json_path, "r", encoding="utf-8") as f:
#         questions = json.load(f)

#     index = int(question_num) - 1  # Assuming order in JSON matches Q.No.
#     if index < 0 or index >= len(questions):
#         print(f"❌ Skipping Q{question_num}: Invalid question number (out of range).")
#         return

#     questions[index]["ImagePath"] = relative_path.replace("\\", "/")

#     if option_paths:
#         questions[index]["OptionImagePaths"] = {
#             k: v.replace("\\", "/") for k, v in option_paths.items()
#         }

#     with open(json_path, "w", encoding="utf-8") as f:
#         json.dump(questions, f, indent=2)
    
#     print(f"✅ Updated Question #{question_num} in JSON.")

# def main():
#     print("📌 Bulk PYQ Image Attacher")

#     # Folder with all images
#     image_folder = input("Enter full path to image folder: ").strip()

#     if not os.path.exists(image_folder):
#         print("❌ Directory does not exist.")
#         return

#     # Regex to identify question image pattern
#     pattern = re.compile(r"(j\d+)_([a-z]+\d+)_([1-2])_(\d+)\.png", re.IGNORECASE)

#     # Load image filenames and filter only question images (not option ones)
#     all_images = os.listdir(image_folder)
#     question_images = [f for f in all_images if pattern.match(f)]

#     # Paths
#     project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
#     json_path = os.path.join(project_root, "data", "PYQ_Questions.json")

#     for filename in question_images:
#         match = pattern.match(filename)
#         if not match:
#             continue

#         year, date, slot, qno = match.groups()
#         year = year.lower()
#         date = date.lower()
#         slot = f"slot{slot}"

#         # Destination directory
#         media_dir = os.path.join(project_root, "media", year, date, slot)
#         os.makedirs(media_dir, exist_ok=True)

#         src_path = os.path.join(image_folder, filename)
#         dest_path = os.path.join(media_dir, filename)
#         shutil.copy2(src_path, dest_path)
#         rel_path = os.path.relpath(dest_path, project_root)
#         print(f"✅ Moved {filename} → {rel_path}")

#         # Check and copy option images
#         option_paths = {}
#         for opt in ["A", "B", "C", "D"]:
#             opt_filename = f"{year}_{date}_{slot[-1]}_{qno}_{opt}.png"
#             opt_src = os.path.join(image_folder, opt_filename)
#             if os.path.exists(opt_src):
#                 opt_dest = os.path.join(media_dir, opt_filename)
#                 shutil.copy2(opt_src, opt_dest)
#                 rel_opt = os.path.relpath(opt_dest, project_root)
#                 option_paths[opt] = rel_opt
#                 print(f"   ↳ Option {opt} image moved → {rel_opt}")

#         update_json(json_path, qno, rel_path, option_paths)

# if __name__ == "__main__":
#     main()



# sexy
# import os
# import json
# import shutil
# import re

# def update_json(json_path, question_num, slot, relative_path, option_paths):
#     with open(json_path, "r", encoding="utf-8") as f:
#         questions = json.load(f)

#     # Each slot contains 75 questions
#     slot_number = int(slot[-1])  # e.g., "slot1" → 1
#     index = (slot_number - 1) * 75 + int(question_num) - 1

#     if index < 0 or index >= len(questions):
#         print(f"❌ Invalid index ({index}) for Question #{question_num}")
#         return

#     # Overwrite image path and option images
#     questions[index]["ImagePath"] = relative_path.replace("\\", "/")

#     if option_paths:
#         questions[index]["OptionImagePaths"] = {
#             k: v.replace("\\", "/") for k, v in option_paths.items()
#         }

#     with open(json_path, "w", encoding="utf-8") as f:
#         json.dump(questions, f, indent=2)

#     print(f"✅ Updated Question #{question_num} (Index {index}) in JSON.")

# def main():
#     print("📌 PYQ Image Attacher\n")

#     # Get the project root directory dynamically
#     script_dir = os.path.dirname(os.path.abspath(__file__))
#     project_root = script_dir  # since you're running from root

#     # Paths for JSON and media folder
#     json_path = os.path.join(project_root, "PYQ_Questions.json")
#     media_root = os.path.join(project_root, "media")

#     print(f"🔎 Project Root: {project_root}")
#     print(f"📄 JSON Path: {json_path}")
#     print(f"🖼️  Media Folder: {media_root}")

#     if not os.path.exists(json_path):
#         print(f"❌ Could not find JSON file at: {json_path}")
#         return

#     # Loop through all images in the specified directory
#     image_dir = input("Enter the path to the image directory (e.g., D:/TangoData/Images): ").strip()

#     if not os.path.exists(image_dir):
#         print("❌ Image directory doesn't exist.")
#         return

#     # Process each image file in the directory
#     for filename in os.listdir(image_dir):
#         if filename.lower().endswith(".png") and re.match(r"(j\d+)_([a-z]+\d+)_([1-2])_(\d+)\.png", filename, re.IGNORECASE):
#             image_path = os.path.join(image_dir, filename)

#             # Extract metadata from filename using regex
#             match = re.match(r"(j\d+)_([a-z]+\d+)_([1-2])_(\d+)\.png", filename, re.IGNORECASE)
#             if match:
#                 year, date, slot, qno = match.groups()
#                 year = year.lower()
#                 date = date.lower()
#                 slot = f"slot{slot}"

#                 # Prepare destination folder
#                 media_dir = os.path.join(media_root, year, date, slot)
#                 os.makedirs(media_dir, exist_ok=True)

#                 # Copy the main question image
#                 dest_question_path = os.path.join(media_dir, filename)
#                 shutil.copy2(image_path, dest_question_path)
#                 rel_path = os.path.relpath(dest_question_path, project_root)
#                 print(f"✅ Moved main image → {rel_path}")

#                 # Now check for option images (A, B, C, D)
#                 option_letters = ["A", "B", "C", "D"]
#                 option_paths = {}

#                 for opt in option_letters:
#                     opt_filename = f"{year}_{date}_{slot[-1]}_{qno}_{opt}.png"
#                     opt_source_path = os.path.join(image_dir, opt_filename)
#                     if os.path.exists(opt_source_path):
#                         opt_dest_path = os.path.join(media_dir, opt_filename)
#                         shutil.copy2(opt_source_path, opt_dest_path)
#                         rel_opt_path = os.path.relpath(opt_dest_path, project_root)
#                         option_paths[opt] = rel_opt_path
#                         print(f"✅ Found & moved option image {opt} → {rel_opt_path}")

#                 # Update JSON for the question
#                 update_json(json_path, qno, slot, rel_path, option_paths)

# if __name__ == "__main__":
#     main()



import os
import json
import shutil
import re

def update_json(json_path, question_num, slot, image_paths, option_paths):
    with open(json_path, "r", encoding="utf-8") as f:
        questions = json.load(f)

    slot_number = int(slot[-1])  # slot1 → 1, slot2 → 2
    index = (slot_number - 1) * 75 + int(question_num) - 1

    if index < 0 or index >= len(questions):
        print(f"❌ Invalid index ({index}) for Q{question_num} in {slot}")
        return

    # Set ImagePath: single → string, multiple → list, none → null
    if image_paths:
        questions[index]["ImagePath"] = image_paths if len(image_paths) > 1 else image_paths[0]
    else:
        questions[index]["ImagePath"] = None

    # Set OptionImagePaths if available
    questions[index]["OptionImagePaths"] = {
        k: v.replace("\\", "/") for k, v in option_paths.items()
    } if option_paths else {}

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2)

    print(f"✅ Q{question_num} ({slot}) → JSON index {index} updated.")

def main():
    print("📌 PYQ Image Attacher (Multi-images + Option Images)\n")

    # Project & paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = script_dir
    json_path = os.path.join(project_root, "PYQ_Questions.json")
    media_root = os.path.join(project_root, "media")

    print(f"📄 JSON Path: {json_path}")
    print(f"🖼️  Media Root: {media_root}")

    if not os.path.exists(json_path):
        print("❌ JSON file not found.")
        return

    image_dir = input("📂 Enter full image folder path: ").strip()
    if not os.path.exists(image_dir):
        print("❌ Image directory doesn't exist.")
        return

    filenames = [f for f in os.listdir(image_dir) if f.lower().endswith(".png")]
    processed_questions = set()

    for filename in filenames:
        match = re.match(r"(j\d+)_([a-z]+\d+)_([1-2])_(\d+)(?:_([a-dA-D0-9]))?\.png", filename, re.IGNORECASE)
        if not match:
            continue

        year, date, slot_num, qno, _ = match.groups()
        year = year.lower()
        date = date.lower()
        slot = f"slot{slot_num}"
        qid = f"{year}_{date}_{slot_num}_{qno}"

        if (slot, qno) in processed_questions:
            continue
        processed_questions.add((slot, qno))

        # Gather image paths
        base = f"{year}_{date}_{slot_num}_{qno}"
        image_paths = []

        # Single-image case
        single_image = f"{base}.png"
        if single_image in filenames:
            src = os.path.join(image_dir, single_image)
            dst_dir = os.path.join(media_root, year, date, slot)
            os.makedirs(dst_dir, exist_ok=True)
            dst = os.path.join(dst_dir, single_image)
            shutil.copy2(src, dst)
            rel = os.path.relpath(dst, project_root).replace("\\", "/")
            image_paths.append(rel)
            print(f"🖼️ Main image found: {rel}")

        # Multi-image case (_1.png, _2.png...)
        multi = sorted([
            f for f in filenames if re.match(rf"{base}_(\d)\.png", f, re.IGNORECASE)
        ], key=lambda x: int(re.findall(r"_(\d)\.png", x)[0]))

        for f in multi:
            src = os.path.join(image_dir, f)
            dst_dir = os.path.join(media_root, year, date, slot)
            os.makedirs(dst_dir, exist_ok=True)
            dst = os.path.join(dst_dir, f)
            shutil.copy2(src, dst)
            rel = os.path.relpath(dst, project_root).replace("\\", "/")
            image_paths.append(rel)
            print(f"🖼️ Multi-image attached: {rel}")

        # Option image collection
        option_paths = {}
        for opt in ["A", "B", "C", "D"]:
            opt_file = f"{base}_{opt}.png"
            if opt_file in filenames:
                src = os.path.join(image_dir, opt_file)
                dst_dir = os.path.join(media_root, year, date, slot)
                os.makedirs(dst_dir, exist_ok=True)
                dst = os.path.join(dst_dir, opt_file)
                shutil.copy2(src, dst)
                rel = os.path.relpath(dst, project_root).replace("\\", "/")
                option_paths[opt] = rel
                print(f"🅰️ Option {opt} image → {rel}")

        # Final update to JSON
        update_json(json_path, qno, slot, image_paths, option_paths)

if __name__ == "__main__":
    main()
