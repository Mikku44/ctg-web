import os
import json
import sys

def convert_files_to_json(directory_path):
    """
    Scans a directory, reads the content of all non-directory files,
    and returns a JSON string containing the file name and its content.
    """
    output_data = []

    # Ensure the provided path exists
    if not os.path.isdir(directory_path):
        # Using sys.stderr for error messages so they don't corrupt the JSON output
        sys.stderr.write(f"Error: Directory not found at path: {directory_path}\n")
        sys.exit(1)

    # Walk through the directory and its subdirectories
    for root, _, files in os.walk(directory_path):
        for filename in files:
            # Construct the full file path
            filepath = os.path.join(root, filename)

            # Construct a relative path for cleaner output
            # We strip the input directory path to keep the output cleaner
            relative_filepath = os.path.relpath(filepath, directory_path)
            
            # Skip the script itself if it's in the target directory
            if os.path.abspath(filepath) == os.path.abspath(sys.argv[0]):
                continue
            
            # Attempt to read the file content
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except UnicodeDecodeError:
                # Handle binary or non-UTF-8 files gracefully
                content = f"!!! CONTENT COULD NOT BE DECODED (Non-text file/Encoding Error) !!! Path: {relative_filepath}"
            except Exception as e:
                # Handle other potential read errors
                content = f"!!! ERROR READING FILE !!! Error: {str(e)} Path: {relative_filepath}"

            # Append the file information to the list
            output_data.append({
                "path": relative_filepath,
                "filename": filename,
                # "content": content
            })

    # Output the final list as a formatted JSON string
    return json.dumps(output_data, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.stderr.write("Usage: python file_to_json_converter.py <path_to_directory>\n")
        sys.exit(1)

    target_directory = sys.argv[1]
    
    # Run the conversion and print the JSON result to standard output
    json_output = convert_files_to_json(target_directory)
    print(json_output)

    with open('image_files.ts', 'w') as file:
        file.write(f'export const images = {json_output}')
        # file.write("This is the second line.\n")