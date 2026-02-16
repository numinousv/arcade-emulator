# Nedanför är information som t.ex vad som behövs vara med (state management som t.ex zustand osv).
# **Vi ska göra en ny README senare**

## 🍱 React-app med dokumentation och redovisning (E1, E2 & E3)
Detta är en gruppuppgift som kombinerar kursens samtliga tre former för kompetens kontroll. De olika momenten uppfyller olika kursmål. Det vill säga de kursmål som man bedöms efter i redovisningen är separata från koduppgiften man har jobba på som i sin tur uppfyller andra kursmål än inlämningsuppgiften med dokumentation. Man får alltså tre separata betyg för varje moment, även om de alla kretsar kring samma React-applikation. Se kursplanen för mer detaljerad information.

 

Det ska finnas commits från samtliga gruppmedlemmar för det ska räknas som att man har deltagit. Övriga regler för grupparbete ska också följas, se stycket om grupparbete i Guide till FMW25 för mer info.

 

E1 - Praktisk uppgift och kodgranskning (React-applikation)
Denna redovisas på eftermiddagen 2026-03-10. Uppgiften ska innehålla:

Komponentbaserad, modulär struktur
Återanvändbara komponenter
Routing
State management
Går delvis att använda t.ex. React Query
Komponent- och andra tredjepartsbilbiotek
API-anrop och strukturerade hanteringsflöden av datanLinks to an external site.
Optimeringar för ökad prestandaLinks to an external site.
Optimeringar för ökad tillgänglighetLinks to an external site.
 

Speech To Text App
Om din grupp redan har en bra appidé är det fritt fram att arbeta på den. I annat fall finns det ett API som tar ljudfiler med tal, transkriberar dem och returnerar utskriften i en textsträng. API:t tillhör tjänsten ApyHubLinks to an external site. som har en mängd olika API:er man skulle kunna använda istället, om så önskas.

ApyHub - Convert text to speechLinks to an external site.
 Designförslag
NotezyLinks to an external site.
Voice recorderLinks to an external site.
AI TranscriptionLinks to an external site.
API:t tar en .wav-fil med inspelat tal och en sträng med språket som talas
Ladda ned en parsad array med alla språk som API:t stödjer härDownload array med alla språk som API:t stödjer här
 Kodexempel:
Vår gemensamma API key är: APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X
fetch('https://api.apyhub.com/stt/file', {
  method: 'POST',
  headers: {
    'apy-token': 'APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X',
  },
  body: form
}).then((res) => res.json());
 

E2 - Inlämningsuppgift med dokumentation (React-applikationens README)
Denna bedöms separat, ett par dagar efter redovisningen ägt rum. Uppgiften ska dokumentera:

Projektets struktur och arbetsflöde
Hur och vilka tillgänglighetsprinciper som implementeratsLinks to an external site.
 

E3 - Presentation/reflektion (Redovisning av React-applikationen)
Själva redovisningen av applikationen bedöms efter två specifika kursmål:

AI-generera kodförslag och föreslå förbättringar på dem
Skrev ned och visa upp dessa exempel om den AI-genererade koden som ni förbättrat inte finns med i appens källkod
Gå igenom designbesluten, samspelet mellan komponenterna etc.