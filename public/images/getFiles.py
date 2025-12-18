import os
import json
import sys
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

def generate_image_sitemap(directory_path, base_url):
    """
    Scans a directory for images and creates a sitemap_images.xml file.
    """
    # Define supported image extensions
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg')
    
    # Create the root element with the required namespaces
    urlset = Element('urlset')
    urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    urlset.set('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')

    # Ensure the directory exists
    if not os.path.isdir(directory_path):
        print(f"Error: Directory not found: {directory_path}")
        return

    # Count for reporting
    image_count = 0

    # Walk through the directory
    for root, _, files in os.walk(directory_path):
        for filename in files:
            if filename.lower().endswith(valid_extensions):
                # Calculate paths
                filepath = os.path.join(root, filename)
                relative_path = os.path.relpath(filepath, directory_path)
                
                # Convert OS path to URL path (handles Windows/Linux differences)
                url_path = relative_path.replace(os.sep, '/')
                full_image_url = f"{base_url.rstrip('/')}/images/{url_path}"
                
                # Create XML Structure
                # Note: In a real sitemap, <loc> is the page the image is ON. 
                # For simple asset tracking, we point <loc> to the image or the homepage.
                url_node = SubElement(urlset, 'url')
                loc = SubElement(url_node, 'loc')
                loc.text = base_url # Usually the page URL, but here we use base for simplicity
                
                image_node = SubElement(url_node, 'image:image')
                image_loc = SubElement(image_node, 'image:loc')
                image_loc.text = full_image_url
                
                # Optional: Add title based on filename (SEO friendly)
                image_title = SubElement(image_node, 'image:title')
                image_title.text = os.path.splitext(filename)[0].replace('-', ' ').replace('_', ' ').capitalize()

                image_count += 1

    # Pretty print the XML
    xml_str = minidom.parseString(tostring(urlset)).toprettyxml(indent="  ", encoding="UTF-8")

    # Save to file
    output_file = "sitemap_images.xml"
    with open(output_file, "wb") as f:
        f.write(xml_str)

    print(f"Success! Created {output_file} with {image_count} images.")



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
        file.write(f'export const images_file = {json_output}')
        # file.write("This is the second line.\n")
        
if __name__ == "__main__":
    # Configuration for Creative Tour Guru Thailand
    DOMAIN = "https://creativetourguruthailand.com"
    
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_images_directory>")
    else:
        target_dir = sys.argv[1]
        generate_image_sitemap(target_dir, DOMAIN)