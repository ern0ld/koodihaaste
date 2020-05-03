# Koodihaaste Solidabis

Tehtäväsi on toteuttaa reittihaku-sovellus, joka kertoo nopeimman mahdollisen reitin kahden pisteen välillä, mikä on kuljettavissa linja-autolla. 
Sovelluksen tulee myös kertoa mitä linja-autoreittejä tulisi käyttää perille pääsemiseksi.

## Aloitus ja käyttö

Web-käyttöliittymä löytyy osoitteesta https://ern0ld.github.io/koodihaaste/.
Saapuessasi sivuille, näytölle ilmestyy ohje ja esimerkki haun tuloksesta. Voit halutessasi sulkea ohjeen painamalla X oikeasta yläkulmasta.
Reittihakuja voi suorittaa syöttämällä lähtöpisteeksi ja päätepisteeksi kirjaimen väliltä A-R. Käyttöliittymä hyväksyy pienet ja suuret kirjaimet.
Syötettyäsi lähtö- ja päätepisteen paina Hae reitti ja kesto-painiketta, sivu tulostaa lyhimmän reitin keston ja listaa ohjeet
reitissä käytettävien etappien välillä. Painamalla listaelementin Näytä-kartalla-painiketta tai mobiilikäyttöliittymässä Näytä >>>-painiketta
näet kartalla lyhyen animaation nuolesta, joka osoittaa kulloisenkin etappivälin. Matkaan sisältyvät pisteet ovat kartalla ympyröity väreillä, joka merkitsee siinä pisteessä valittavan linjan väriä. Päätepiste on merkitty tähdellä. Animaation nuoli osoittaa myös kulloisessakin etapissa käytettävän linjan värin. Käytettävä linja ja matkan kesto kerrotaan myös listaelementissä.

## Tekniikat

* Vanilla JavaScript
* Single page application-tekniikka. Sopi mielestäni hyvin tähän, koska sivuston ei tarvitse esimerkiksi lähettää pyyntöjä palvelimelle missään vaiheessa. Mahdollistaa sulavan käyttökokemuksen muokkautumalla dynaamisesti. Käyttäjän syöttämien pisteiden välisen matkan kesto lasketaan Dijsktran algoritmin avulla ja piirretään canvakselle Solidabiksen sivuilta kuvana otettuun karttaan. Sivulle lisätään listaelementteinä reittiohjeet jokaisesta etapista ja jo sivuilla olemassaolevat elementit poistetaan ja luodaan uudet mikäli suoritetaan uusi haku. Päivitettäessä sivu palautuu alkutilaan ja ohje ilmestyy esiin.

## Tekijä

Erkki Suvila

## Tunnustukset

* Dijsktran algoritmi
* Stackoverflown käyttäjille vinkeistä canvaksen käsittelyyn

