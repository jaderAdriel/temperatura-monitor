#include <OneWire.h>
#include <DallasTemperature.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define WIFI_SSID "Qual a senha do wifi?" // Nome da rede WiFi.
#define WIFI_PASSWORD "Farofa123" // Senha da rede WiFi.

#define API_KEY "AIzaSyBJyKSTeb2d2_FL2USyGP7fXUP7dNmX1so"
#define DATABASE_URL "https://monitoring-43c1d-default-rtdb.firebaseio.com"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

#define ONE_WIRE_BUS 2 
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

String dateTime;

void setup() {
  Serial.begin(9600); // inicia a comunicação serial
  sensors.begin();    // inicia o sensor de temperatura

  initWiFi();         // conexão wifi
  connectFirebase();  // conexão firebase
  
  timeClient.begin();
  timeClient.setTimeOffset(-10800); // -10800 => GMT -3
}

void loop() {
  timeStamp();
  readTemperatureSensor();
  delay(1000);
}

void readHeartBeatSensor() {

}

void readTemperatureSensor() {
  sensors.requestTemperatures(); // solicita a leitura da temperatura
  float temperatura = sensors.getTempCByIndex(0); // obtém a temperatura em graus Celsius
  sendFloatDataToFirebase("/temperatura/valor", temperatura);
  sendStringDataToFirebase("/temperatura/horario", dateTime);

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");
}

void sendFloatDataToFirebase(String path, float data ){
  Firebase.RTDB.setFloat(&fbdo, path, data); 
}

void sendStringDataToFirebase(String path, String data ){
  Firebase.RTDB.setString(&fbdo, path, data); 
}

void timeStamp( ) {
  timeClient.update();
  time_t epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime ((time_t *)&epochTime);  
  dateTime = String(ptm->tm_mday) + "-" + String(ptm->tm_mon+1) +  "-" + String( ptm->tm_year+1900);
  dateTime += " " + timeClient.getFormattedTime();
}

void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}


void connectFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Serial.print("Connecting to Firebase ... ");

  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.print("Connected");
  } else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str()); // Mensagem de erro de coneção ao Firebase.
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}