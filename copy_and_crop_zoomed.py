import os
import shutil
from PIL import Image

dist_dir = r"c:\Users\yeshu\Documents\IHC\Aplicacion Interactiva\dist\players"
public_dir = r"c:\Users\yeshu\Documents\IHC\Aplicacion Interactiva\public\players"
generated_courtois = r"C:\Users\yeshu\.gemini\antigravity\brain\d4911df0-c934-4a81-8534-c9babd396eb6\courtois_1779768723396.png"

# 1. Copy generated Courtois image to public/players/courtois.png and resize
if os.path.exists(generated_courtois):
    print("Copying and resizing generated Courtois portrait...")
    try:
        with Image.open(generated_courtois) as img:
            resized_img = img.resize((512, 512), Image.Resampling.LANCZOS)
            resized_img.save(os.path.join(public_dir, "courtois.png"), "PNG")
            print("Successfully copied and resized courtois.png to public/players")
    except Exception as e:
        print(f"Error copying Courtois: {e}")

# 2. Process other players from dist to public with zoomed-in crop (1150x1150)
print("\nProcessing horizontal images in dist/players to make them centered squares (1150x1150)...")
for filename in os.listdir(dist_dir):
    dist_path = os.path.join(dist_dir, filename)
    public_path = os.path.join(public_dir, filename)
    
    if os.path.isfile(dist_path):
        try:
            with Image.open(dist_path) as img:
                width, height = img.size
                if width > height:
                    # It's a horizontal image! We want to crop it zoomed in to remove black side margins.
                    print(f"Zoom-cropping horizontal image {filename} ({width}x{height})")
                    
                    # We will crop a 1150x1150 box in the center
                    crop_dim = 1150
                    left = (width - crop_dim) // 2
                    top = (height - crop_dim) // 2
                    right = left + crop_dim
                    bottom = top + crop_dim
                    
                    cropped_img = img.crop((left, top, right, bottom))
                    resized_img = cropped_img.resize((512, 512), Image.Resampling.LANCZOS)
                    resized_img.save(public_path, "PNG")
                    print(f"Saved optimized zoomed portrait for {filename}")
                else:
                    # It is already square, just copy and resize if needed (should already be done, but let's make sure it's 512x512)
                    if not os.path.exists(public_path) or os.path.getsize(public_path) > 500000:
                        print(f"Copying and resizing square image {filename} ({width}x{height})")
                        resized_img = img.resize((512, 512), Image.Resampling.LANCZOS)
                        resized_img.save(public_path, "PNG")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
