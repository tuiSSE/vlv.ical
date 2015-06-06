# 2. Review

## Technischer Hintergrund

### Initialisierung
Der Einstieg in die Programmlogik befindet sich in der Datei namens `init.js`. Diese initialisiert das Programm, indem es benötigte Variablen entweder aus dem Speicher liest, oder diese leer erzeugt, wie zum Beispiel ein Array für den "Warenkorb". Im Anschluss erzeugt es die Seitenleiste für den Warenkorb, der auf allen Seiten des VLV vorhanden sein wird. Es folgen dann einige Überprüfungen, die je nachdem auf welcher Unterseite man sich befindet, bestimmte Elemente erzeugen und Funktionen aufrufen. Im Folgenden bezieht sich der gesamte Ablauf auf die Textansicht eines bestimmten Studienganges.

![Text Version des VLV](res/VLV_textVersion.jpg)

Da die Überprüfung, ob es sich um die Textversion handelt, positiv ausfällt, wird nun die Logik aufgerufen, welche alle Veranstaltungen auf der Seite sucht und diese in einem Array temporär speichert. Anhand dieses Arrays werden auf dieser Seite nun Buttons eingefügt, die es erlauben, eine Veranstaltung zu dem Warenkorb hinzuzufügen. Des weiteren werden Ränder eingefügt, um Veranstaltungen optisch von anderen abzugrenzen. Des weiteren wird in diesem Punkt eine Logik aufgerufen, die den Nutzer darüber informiert, ob in den letzten 2 Wochen (Zeitraum wird in zukünftigen Versionen konfigurierbar sein) Änderungen der Daten stattgefunden haben. Dies erfolgt über eine optische Hervorhebung der Aktualisierungsdaten und über eine Benachrichtigung in der rechten oberen Ecke der Seite. Am Ende der Initialisierung wird aus dem Speicher ein eventuell vorhandener Warenkorb aus einer vorherigen Sitzung ausgelesen und diese Auswahl erneut hervorgenommen.
Nun ist die Initialisierung abgeschlossen und der weitere Programmablauf wird durch die Interaktionen des Nutzers bestimmt.

### Auswahl einer Veranstaltung
Wird eine Veranstaltung zum Warenkorb hinzugefügt, so wird eine Funktion namens `saveToCart()` aufgerufen. Diese Funktion erzeugt ein leeres JSON Objekt nach folgendem Aufbau:

~~~js
{
	id: "",
	name: "",
	link: [],
	location: "",
	begin: "",
	end: "",
	comment: ""
}
~~~

Dieses noch leere Objekt wird nun nach und nach mit Informationen gefüllt:
- `id`: Die eindeutige ID des Container-Objekts (ein div Objekt) dieser Veranstaltung
- `name`: Der Name der Veranstaltung
- `link`: Der DOM-Pfad zu dem Container-Objekt dieser Veranstaltung (um später wieder auf das ursprüngliche Objekt schließen zu können)
- `location`: Der Ort, an dem die Veranstaltung stattfinden wird
- `begin`: Der Startzeitpunkt, an dem die Veranstaltung beginnt
- `end`: Der Endzeitpunkt, an dem die Veranstaltung endet
- `comment`: Ein Kommentar zu der Veranstaltung, in dem wir die/den Lesende(n) einfügen

Die werte `name`, `location`, `begin`, `end` und `comment` sind durch den Nutzer später durch einen modalen Dialog änderbar.

