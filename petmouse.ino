
// Author: Scott Robinson
// charmedlabs.com
//
// a program to export the X and Y position of 1 object as two PWM-signals at pin 3 and 5 of an arduino uno
// Author of edited version: Bart Mertens. Source: http://cmucam.org/boards/9/topics/3321?r=3405#message-3405 // Very little modifications by Emiliano Daddario
#include <SPI.h>  
#include <Pixy.h>

Pixy pixy;
int lastX; int lastY;
void setup()
{
  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(2, OUTPUT);
TCCR0B = TCCR0B & 0b11111000 | 0x01;
  pixy.init();
}
void loop()
{
  uint16_t blocks;
  blocks = pixy.getBlocks();
  if (blocks) // !=0) 
 {
   //digitalWrite(2,HIGH);   
     lastX = int(float(pixy.blocks[0].x)/319.0f*255.0f); // analogWrite(6,int(float(pixy.blocks[0].x)/319*255));//The transformed X-position is here outputted as a PWM-signal at pin 6.
     lastY = int(float(pixy.blocks[0].y)/199.0f*255.0f); // analogWrite(5,int(float(pixy.blocks[0].y)/199*255));//The transformed Y-position is here outputted  as a PWM-signal at pin 5
 }
else
 {
/* digitalWrite(2,LOW); */ analogWrite(6, lastX); analogWrite(5, lastY);
}
//delay(640);
}
