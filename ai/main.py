import os
import sys
import time
import pyjokes
import datetime
import wikipedia
from audio import speak
import pywhatkit as pwk
import speech_recognition as sr
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()  # load the environment variables

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")


def save_log():
    try:
        timestamp = str(datetime.datetime.now()).replace(":", "-").replace(" ", "_")
        sys.stdout = open(os.path.join("logs", timestamp + "__terminal.log"), "w")
        print("Terminal Log Saved!")
    except OSError as e:
        print(f"Something went Wrong! => {str(e)}")
        pass


listener = sr.Recognizer()


def gemini_ai(prompt):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    return response.text


speak("How Can I Help You...")


def take_command():
    try:
        with sr.Microphone() as source:
            print("I'm Listening...")

            voice = listener.listen(source)
            command = listener.recognize_google(voice)
            command = command.lower()

            if "alexa" in command:
                command = command.replace("alexa", "")
                print(command)
            else:
                msg = "Command not found!"
                print(msg)
                speak(msg)
    except Exception as e:
        command = str(e)
        pass
    return command


def run_alexa():
    command = take_command()

    if not command:
        msg = "Command Not Found!"
        print(msg)
        command = take_command()

    if "time" in command:
        current_time = datetime.datetime.now().strftime("%I:%M:%I %p")
        current_time = "Current Time is: " + current_time
        print(current_time)
        speak(current_time)

    elif "play" in command:
        try:
            song = command.replace("play", "")
            speak_command = "Playing... " + song
            print(speak_command)
            speak(speak_command)
            pwk.playonyt(song)

        except pwk.core.exceptions.InternetException as e:
            msg = str(e)
            speak(e)
            pass

    elif "joke" in command:
        msg = "Ok... finding jokes: \n"
        speak(msg)
        joke = pyjokes.get_joke()
        speak(joke)

    elif "tell me about" in command:
        information = command.replace("tell me about", "")
        msg = "Collecting Information About: " + information
        speak(msg)
        try:
            info = wikipedia.summary(information)
            print(f"\n{msg}\n{info}\n")
            speak(info)
        except wikipedia.exceptions.PageError as e:
            print(e)
            speak("There was an error occurred: " + str(e))

    elif (
        "time" not in command
        and "play" not in command
        and "joke" not in command
        and "tell me about" not in command
    ):
        # msg = "Collecting information from an Artificial Intelligence..." + command
        msg = "Collecting information about" + command
        print(f"\n\n{msg}\n\n")
        speak(msg)
        speak("Note that, It may takes a little times for response!")

        ai_res_text = gemini_ai(command)
        print(f"\n\nYour Answer:\n{ai_res_text}\n\n")
        speak(ai_res_text)

    else:
        speak("Thanks You. Feel free to ask me everything...")
        speak("I'm Listening...")
        time.sleep(3)


if __name__ == "__main__":
    while True:
        run_alexa()


speak("Shutting down alexa ai assistant!")
