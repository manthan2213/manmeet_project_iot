// Automatic Night Lamp System
// LDR on A0 (voltage divider). Relay or LED on D8.

const int ldrPin = A0;      // LDR connected to analog pin A0
const int lampPin = 8;      // Relay or LED connected to digital pin 8
int threshold = 500;        // Adjust this threshold for your environment (0-1023)
unsigned long debounceDelay = 200; // ms

unsigned long lastToggle = 0;
int lampState = LOW;

void setup() {
  Serial.begin(9600);
  pinMode(lampPin, OUTPUT);
  digitalWrite(lampPin, lampState);
}

void loop() {
  int sensorValue = analogRead(ldrPin);
  Serial.print("LDR: "); Serial.println(sensorValue);

  // Simple hysteresis: only toggle after debounceDelay
  if (millis() - lastToggle > debounceDelay) {
    if (sensorValue < threshold && lampState == LOW) {
      lampState = HIGH;            // it's dark -> turn lamp ON
      digitalWrite(lampPin, lampState);
      lastToggle = millis();
    } else if (sensorValue >= threshold && lampState == HIGH) {
      lampState = LOW;             // it's bright -> turn lamp OFF
      digitalWrite(lampPin, lampState);
      lastToggle = millis();
    }
  }

  delay(150);
}
