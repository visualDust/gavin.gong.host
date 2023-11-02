import json
import os
import yaml
from PIL import Image

source_dir = "original_images"
thumbnail_dir = "thumbnails"
target_dir = "../../../src/components/gallery"

valid_images = []
valid_thumbnails = []
valid_metadata = []
image2thumbnails = {}
image2metadata = {}

# scan original images
for item in os.listdir(source_dir):
    if os.path.isfile(os.path.join(source_dir, item)):
        if item.endswith((".jpg", ".jpeg", ".png")):
            valid_images.append(item)

# scan thumbnails
for item in os.listdir(thumbnail_dir):
    if os.path.isfile(os.path.join(thumbnail_dir, item)):
        if item.endswith(".jpg"):
            valid_thumbnails.append(item)

# scan metadata
for item in os.listdir(source_dir):
    if os.path.isfile(os.path.join(source_dir, item)):
        if item.endswith(".info"):
            valid_metadata.append(item)


# metadata and thumbnails file check
for imageFile in valid_images:
    filenameSegment = imageFile.split(".")
    filename = ""
    for segment in filenameSegment[:-1]:
        filename += segment
    if filename + ".info" in valid_metadata:
        image2metadata[imageFile] = f"{source_dir}/{filename}.info"
    if filename + ".jpg" in valid_thumbnails:
        image2thumbnails[imageFile] = f"{thumbnail_dir}/{filename}.jpg"

# meta data file creation
for imageFile in valid_images:
    # if no thumbnail exist
    if imageFile not in image2thumbnails:
        # create thumbnail
        filenameSegment = imageFile.split(".")
        filename = ""
        for segment in filenameSegment[:-1]:
            filename += segment
        _image = Image.open(os.path.join(source_dir, imageFile))
        _image.thumbnail((300, 300), Image.ANTIALIAS)
        _image.save(os.path.join(thumbnail_dir, filename + ".jpg"))
        image2thumbnails[imageFile] = f"{thumbnail_dir}/{filename}.jpg"

    # if no meta exist
    if imageFile not in image2metadata:
        # create metadata
        filenameSegment = imageFile.split(".")
        filename = ""
        for segment in filenameSegment[:-1]:
            filename += segment
        with open(
            os.path.join(source_dir, filename + ".info"), "w", encoding="utf-8"
        ) as metadata:
            empty_metadata = f"""
title: {filename}
caption: 
tags: 
"""
            metadata.write(empty_metadata)
            image2metadata[imageFile] = f"{source_dir}/{filename}.info"

# json file creation
jsonarray = []
# read metadata
for _image in image2metadata.keys():
    with open(image2metadata[_image], "r", encoding="utf-8") as stream:
        full_image_info = yaml.safe_load(stream)
    full_image_info["file"] = f"{source_dir}/{_image}"
    full_image_info["thumbnial"] = image2thumbnails[_image]
    _image = Image.open(image2thumbnails[_image])
    full_image_info["width"] = _image.width
    full_image_info["height"] = _image.height
    if full_image_info["tags"]:
        full_image_info["tags"] = full_image_info["tags"].split(",")
    jsonarray.append(full_image_info)
# write json
json.dump(
    jsonarray, open(os.path.join(target_dir, "gallery.json"), "w", encoding="utf-8")
)
