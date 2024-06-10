#!/bin/bash

# Find all PNG files in the current directory and subdirectories
find . -type f -name "*.png" | while read -r file; do
    # Get the directory path of the file
    dir=$(dirname "$file")
    
    # Get the filename without extension
    filename=$(basename "$file" .png)
    
    # Convert PNG to WebP
    cwebp "$file" -o "${dir}/${filename}.webp"
    
    echo "Converted $file to ${dir}/${filename}.webp"
done

echo "All PNG files have been converted to WebP."