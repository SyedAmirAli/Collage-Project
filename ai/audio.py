from gtts import gTTS
from io import BytesIO
import pydub
from pydub.playback import play
import pyttsx3
import os

alexa = pyttsx3.init()
voices = alexa.getProperty("voices")
alexa.setProperty("voice", voices[1].id)


def speak(text, lang="en"):
    tts = gTTS(text=text, lang=lang)
    audio_stream = BytesIO()
    tts.write_to_fp(audio_stream)
    audio_stream.seek(0)
    audio = pydub.AudioSegment.from_file(audio_stream)
    play(audio)


def talk(text):
    alexa.say(text)
    alexa.runAndWait()


def speaker(text, lang="en"):
    tts = gTTS(text=text, lang=lang)
    tts.save("listener.mp3")
    os.system("mpg321 listener.mp3")
