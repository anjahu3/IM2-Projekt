# Run with the Sun

Auf meiner Webseite können Nutzer durch das Anklicken verschiedener Städte Informationen zu Sonnenaufgang, Sonnenhöchststand und Sonnenuntergang abrufen. Es wird die aktuelle Ortszeit der ausgewählten Stadt angezeigt sowie die genauen Zeiten, zu denen die Sonne auf- und untergeht.

Über den Button „Weitere Infos“ sehen die Besucher zusätzliche den aktuellen Sonnenstand oder Mondstand, basierend auf der lokalen Zeit der jeweiligen Stadt.
Dank dieser Funktionen bietet die Webseite jederzeit einen umfassenden Überblick. So verpasst man beispielsweise nie wieder einen Sonnenuntergang.

Für die Webseite wurden verschiedene Städte ausgewählt, die sich in unterschiedlichen Zeitzonen befinden. Dadurch werden die angezeigten Daten abwechslungsreicher und interessanter, da die Tageszeiten der einzelnen Städte voneinander abweichen. Beim Anklicken einer Stadt passt sich das Design der Informationskarte automatisch an die lokale Uhrzeit an. Befindet sich die Stadt in der Nachtzeit, wird eine dunkle Karte mit den entsprechenden Informationen angezeigt. Während der Tageszeit erscheint die Karte in einem hellen Design. Gleichzeitig werden auch die Symbole, die Schriftfarbe sowie der Button „Weitere Infos“ an das jeweilige Design angepasst.

Die Darstellung richtet sich nach folgenden Zeiten:
07:00–16:59 Uhr: Helles Design
17:00–06:59 Uhr: Dunkles Design

Im zweiten Teil der Webseite befindet sich ein Sonnenstrahl, dessen Darstellung ebenfalls von der lokalen Zeit abhängt. Tagsüber wird auf dem Strahl eine Sonne angezeigt, während nachts ein Mond erscheint. Das entsprechende Symbol wird dabei automatisch passend zur aktuellen Tageszeit ausgewählt und auf dem Strahl dargestellt.

Herausforderungen und Learnings:
Die grösste Herausforderung war die Umsetzung des zweiten Teils, des Sonnenstrahls. Dabei befanden sich die Sonne oder der Mond zunächst nicht an der richtigen Position auf dem Strahl. Dieser Teil musste ich mithilfe KI umsetzten, da es sehr schwierig war und die Berechnung auf methemtische Formeln basiert war (siehe Code).
Ein wichtiges Learning war für mich die Anwendung von if-else-Bedingungen. Dadurch konnte ich verschiedene Funktionen mehrfach auf meiner Website einsetzen, beispielsweise um das Design automatisch an die Tageszeit anzupassen oder je nach Tageszeit das passende Symbol (Sonne oder Mond) anzuzeigen. Die Lottie-Animation funktionierte gut und hat auch Spass gemacht, die selbst umzusetzen.

Benutze API: https://www.freepublicapis.com/sunset-times-api
Lottie-Animation: Selbst im Figma erstellt
