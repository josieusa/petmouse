#PetMouse by Emiliano Daddario ([JosieUSA.com](http://josieusa.com))

#DISCLAIMER

I'm not responsible for any damage. There are mistakes in the schematic, though it works (see "Known issues" below). It's not the best possible schematic: it's the one that I tested to work. I made some choices by trial and error, for example the 47 Ω resistors, and the wire connecting Arduino digital ground and Beaglebone Black analog ground. I forgot to use the Arduino pin number 2 which was used in the original sketch. And so on. I tested it with a BeagleBone Black rev. A6A, an Arduino Rev. C and a Pixy in the Kickstarter version.

#FAQ

* ##What's this?

    **The world's funniest computer mouse**. How to use it: move a mouse plushy in mid air in front of a pan-tilt camera.

    I showcased a working, interactive demo as an exhibitor at Maker Faire Rome 2014, and as a speaker at Linux Day Rome 2014.
    
    **[Video of the demo at Maker Faire Rome 2014](http://josieusa.com/petmouse.3gp)** (Released under [Creative Commons by-nc-nd 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/) license)

    **[Slides of the demo at Linux Day Rome 2014](http://josieusa.com/break_your_bone_edited.pdf)** (Released under [Creative Commons by-nc-nd 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/) license)

    Pictures coming soon.
 
* ##Breadboard schematic

	This image was created with [Fritzing](http://fritzing.org) and released under the [CC by-sa 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license.
    Check out `petmouse.fzz`, `petmouse.svg` and `petmouse.png` too.

    ![PetMouse breadboard schematics](http://josieusa.com/petmouse.png)
    

* ##Differences with the official Pixy pan-tilt demo

    + No equivalent to `petmouse.go` is included in that demo.
    + In PetMouse, the servos are controlled by `petmouse.js`. In that demo, they are controlled by the Pixy.
	+ Difference with reading from the analog output of Pixy: `petmouse.ino` sends both X and Y at the same time, while you can only read one coordinate at a time from the Pixy output.

* ##Is there any easier way than this to use Pixy CMUCam5 with BeagleBone Black?

    If you find it, let me know. New Pixy firmwares are being released over time.

* ##Why GPL?

    The license may be subject to change in the future. Contact me if you want a different license now. If you are one of those people who make the Pixy, I'd be happy if you contact me for other aspects of PetMouse, too.

    I think the right license for `petmouse.ino` is GPL, but I'm not sure, because it is an edited version of the code by Bart Mertens on [Pixy Software forum](http://cmucam.org/boards/9/topics/3321?r=3405#message-3405) with very little modifications by me. I guess his code, too, was an edited version from Pixy Github repository, which is all GPL. So, for now consider `petmouse.ino` as being GPL, and probably going to stay GPL, unless I rewrite it from scratch.

* ##Is everything released under the GPL including the Fritzing schematics?

    No. The Fritzing schematics (the files `petmouse.fzz`, `petmouse.png` and `petmouse.svg`) are released under the [Creative Commons Attribution - ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license. The image of the breadboard view was created with [Fritzing](http://fritzing.org). I can't change the license in the future.

# INSTRUCTIONS

* ##Requirements

	+ A Pixy CMUCam 5.
	+ A BeagleBone Black
	+ An Arduino Uno.
	+ Their respective power supplies (5 V, 1 A; 3 supplies in total).
	+ Ubuntu (tested with 13.04 64-bit).
 	+ An USB cable for BeagleBone Black (used for data connection).
	+ An USB cable for Arduino (for sketch uploading).
	+ A Pixy pan-tilt mechanism, or a custom mechanism with micro servos.
	+ A mini breadboard is enough, but a regular one is recommended unless you want to reduce overall size.
	+ Wires, resistors, capacitors.
	+ Optional: an Adafruit BeagleBone Black Proto Plate (see pictures).
	+ A room with good light conditions.
	+ A bright-colored mouse plushy, or a plushy with a diffuse, colored LED light on it.
	+ Optional: a mouse-shaped plastic enclosure for the whole assembly.

* ##Software setup

	+ Upload `petmouse.ino` on the Arduino.
	+ Upload `petmouse.js` on the BeagleBone black.
	+ Install Go 1.2 and xdotool on Ubuntu using this command: `sudo apt-get install golang xdotool`.
	+ Teach Pixy the object that you want Pixy to follow, as explained [here](http://www.cmucam.org/projects/cmucam5/wiki/Teach_Pixy_an_object).

* ##Hardware setup

	+ Assemble the Pixy pan-tilt mechanism as explained in the [wiki](http://www.cmucam.org/projects/cmucam5/wiki/Assembling_pantilt_Mechanism), but don't connect servos wires to the Pixy at all. Keep track of what wires belong to the pan servo and what belong to the other servo instead. Also read ["Powering Pixy" wiki](http://www.cmucam.org/projects/cmucam5/wiki/Powering_Pixy).
	+ Assemble the breadboard circuit as shown in the schematic above. Please note that the servos wires in the schematic are connected to the BeagleBone Black, instead of being connected to the Pixy.
	+ Wait for the next steps before connecting wires to the following BeagleBone pins, don't do it yet: P9_1, P9_2, P9_3, P9_4. Please refer to the [docs](http://beagleboard.org/Support/bone101) for pin numbers.

* ##Usage

	+ Plug in the power supplies.
	+ Check that the Pixy is in tracking mode and is tracking the object well, by checking that the integrated LED turns bright red when you put the object close in front of the camera. Please refer to the Pixy wiki for tracking mode.
	+ Connect the BeagleBone Black to the Ubuntu PC using the cable.
	+ Wait a minute or two, then open Cloud9 IDE by entering the following address in the browser's address bar on Ubuntu: `192.168.7.2:3000`.
	+ Run `petmouse.js` on the BeagleBone Black from Cloud9 IDE.
	+ Run the following command on Ubuntu: `go run /path/to/petmouse.go`.
	+ ONLY NOW (AND NOT BEFORE) you can connect the four disconnected wires to the corresponding BeagleBone Black pins (P9_1, P9_2, P9_3, P9_4).
	+ Test PetMouse by moving the colored object in front of the camera.

* ##Known issues
	+ The micro servo motors are powered by Beaglebone Black. When some servo requires too much current (for example when moving fast), the BeagleBone Black may turn itself off, due to lack of enough power. If so, just unplug and re-plug the BeagleBone Black. This is also the reason why a power supply is required in addition to the power provided by the USB cable.
	+ The BeagleBone Black may also turn off if you don't run `petmouse.js` before connecting the four disconnected wires, as I wrote before.
	+ For the same reason, the BeagleBone Black may freeze (you may notice it because the integrated blue LEDs freeze, too). If so, DO NOT unplug the power from BeagleBone Black. Instead, press and hold the integrated "power" button on the BeagleBone Black for about 5 seconds, and wait for the integrated LEDs to turn off. Then unplug the BeagleBone Black and restart from step 1 of "Usage".
	+ For unknown reasons, the Pixy may also freeze. You may notice it because the LED shines with a different pattern than the tracking mode. If so, just unplug and re-plug it.
