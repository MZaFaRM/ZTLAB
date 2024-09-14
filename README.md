# ZTLAB - ETLAB Wrapper App 🎓📱

This is a React Native-based mobile app designed to enhance the usability and functionality of the widely-used ETLAB campus management system. The app simplifies student life by improving access to key features like attendance tracking and class timetables, while also offering a cleaner and more intuitive user interface. 🚀

## ✨ Features

- **📊 Attendance Tracker:** Easily calculate how many more classes you need to attend to meet the minimum attendance requirement for the semester.
- **📅 Enhanced Timetable UI:** Provides a streamlined and visually appealing timetable for better class navigation and planning.
- **🔗 ETLAB Integration:** Seamlessly integrates with the ETLAB backend to provide real-time access to essential student data.

## 🛠️ Tech Stack

- **⚛️ React Native:** Frontend framework for building cross-platform mobile apps.
- **🚀 FastAPI:** Backend for handling requests and managing interactions with the ETLAB platform.
- **🌐 Render (Hosting Service):** Hosting the backend for the app.

## ⚡ Performance Considerations

One challenge is that the backend runs on a free Render hosting server. When inactive for over an hour, the server spins down, leading to a delay of up to a minute and a half for the first request when it's being restarted. ⏳ While this setback affects initial load times, subsequent requests are processed efficiently.

## 💡 Motivation

Originally developed to make life easier for my peers, the ZTLAB wrapper app aimed to streamline class and attendance management for students. Although the project isn't fully optimized or completed, it was a valuable learning experience and a functional tool during its active development. 🌱
