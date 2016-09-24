http://facebook.github.io/react-native/releases/0.23/docs/android-setup.html

Installed android studio - this installed the android sdk version 24
Install sdk version 23, I used the android sdk manager to do this
Install the android sdk build tools 23.0.1
Setup ADB, for android device management.  Set the path variable to the android tools directy.
Now I am receivng and error that a device is not found, I need to create a device emulator.


Added following to .bashrc
export ANDROID_HOME=/Users/Tom/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools

Run androind in terminal to open android package manager
Install system images
– Intel x86 Atom_64 System Image
– Intel x86 Atom System Image

Configure hardware acceleration (HAXM), otherwise the emulator is going to be slow (or may not run at all).
On a mac this is typically requires opening: /usr/local/opt/android-sdk/extras/intel/Hardware_Accelerated_Execution_Manager/IntelHAXM_<version>.dmg and installing the package within. (this was under /Users/Tom/Library/Android/sdk

run terminal command and setup avd
android avd

... not done yet. 
