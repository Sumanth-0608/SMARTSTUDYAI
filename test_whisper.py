#!/usr/bin/env python
"""Test if Whisper is properly installed and working"""

try:
    import whisper
    print("✅ Whisper imported successfully")
    
    # Try to load the model
    print("Loading Whisper base model (this may take a minute on first run)...")
    model = whisper.load_model("base")
    print("✅ Whisper model loaded successfully")
    print(f"Model type: {type(model)}")
    
except ImportError as e:
    print(f"❌ Failed to import whisper: {e}")
    print("Try installing: pip install openai-whisper")
except Exception as e:
    print(f"❌ Error with whisper: {e}")
