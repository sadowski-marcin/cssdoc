# Specyfikacja CSS Document – arkusz stylów dokumentu drukowanego

## Wstęp

Niniejszy dokument stanowi opis specyfikacji „CSS Document”, a jednocześnie przykład jej zastosowania. Specyfikacja ta służy do przygotowywana broszur, książek, prac naukowych i innych dokumentów w postaci plików HTML, wyglądem jak najbardziej zgodnych z regułami profesjonalnego składu takich dokumentów w wersji drukowanej<sup>*</sup>. Poniżej zostały zaprezentowane elementy języka HTML, do których zdefiniowano odpowiednie style CSS<sup>**</sup>, oraz opisane funkcjonalności uzupełniane narzędziami _javascript_.

_Pamiętaj!_ Specyfikacja „CSS Document” jest specyfikacją cały czas otwartą, poprawianą i aktualizowaną. Dlatego też przed użyciem jej w docelowym dokumencie sprawdź aktualność wersji.

<sup>*</sup> Wygląd sformatowanego dokumentu (tj. zgodność z prawidłami składu tekstów drukowanych) zależy od wykorzystanej przeglądarki internetowej. Przyczynia się do tego fakt, że niektóre przeglądarki – nawet w najnowszych wersjach – mogą nie mieć zaimplementowanej obsługi wszystkich poleceń CSS zastosowanych w specyfikacji „CSS Document”.

<sup>**</sup> Elementy języka HTML nie opisane w niniejszej specyfikacji formatowane będą zgodnie z predefiniowanymi stylami wykorzystywanej przeglądarki internetowej.

## Przygotowanie dokumentu

### Pliki do pobrania

Aby stosować specyfikację „CSS Document” w pierwszym kroku należy pobrać ze [strony projektu](http://github.com/sadowski-marcin/cssdoc) wskazane poniżej pliki _.js_ oraz _.css_:

* _document.css_ – główny plik stylów CSS;
* _document.js_ – implementuje funkcje automatyzujące tworzenie dokumentu (np. numerację nagłówków, rysunków i tabel) oraz pozwalające stosować odnośniki wewnątrz dokumentu.

Dodatkowo udostępnione zostały następujące pliki mogące służyć za żywy przykład implementacji specyfikacji „CSS Document”:

* _preview.html_ – przykładowy dokument HTML;
* _preview.pdf_ – przykładowy dokument HTML „wydrukowany” do PDF w przeglądarce Safari 12.1.2 w systemie macOS Mojave 10.14.6;
* _img.png_ – zdjęcie kotka (przykład ilustracji w dokumencie);
* _star.png_ – ikona gwiazdki (przykład ilustracji wstawionej w ciąg tekstu);

### Struktura pliku

Przystępując do tworzenia dokumentu zgodnego ze specyfikacją „CSS Document” należy utworzyć dokument tekstowy z rozszerzeniem `.html` zawierający poniższy fragment kodu:

```html
<!DOCTYPE html>
<html lang="pl">
    <head>
        <title>… … tytuł dokumentu … …</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="Author" content="… … imię i nazwisko autora … …" />

        <link rel="Stylesheet" type="text/css" href="document.css" />        
        <script type="text/javascript" src="document.js"></script>
        
        <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({
                tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
                TeX: { equationNumbers: {autoNumber: "all"} } });
        </script>
    </head>
    <body>
    …
    </body>
</html>
```

przy czym:

1. dokładna wartość odnośnika `href` do pliku _document.css_ zależy od lokalizacji tego pliku na dysku względem pliku _.html_ z treścią dokumentu;
2. linia `<script type="text/javascript" src="document.js"></script>` odpowiada za uruchomienie skryptu _javascript_ automatyzującego formatowanie dokumentu:
	* numerowanie nagłówków,
	* numerowanie ilustracji,
	* numerowanie tabel,
	* dopisywanie do odnośników odwołujących się do elementów danego dokumentu numerów tych elementów;
3. dokładna wartość odnośnika `src` do pliku _document.js_ zależy od lokalizacji tego pliku na dysku względem pliku _.html_ z treścią dokumentu;
4. dwa ostatnie polecenia `<script` odpowiedzialne są za obsługę wzorów matematycznych (podrozdział ……).

## Struktura dokumentu

### Strona tytułowa

Stronę tytułową składa się z użyciem następujących bloków `div`:

```html
<div id="title">tytuł dokumentu</div>
<div id="subtitle">podtytuł</div>
<div id="author">autor</div>
<div id="edition">wersja, miejsce i data wydania etc.</div>
```

Zawiera ona cztery bloki odpowiedzialne za tytuł i podtytuł dokumentu, wskazanie autora (autorów) dokumentu oraz za informacje o numerze, miejscu i dacie (roku) wydania.
Po stronie tytułowej zaleca się umieszczenie dodatkowego bloku _imprint_:

```html
<div id="imprint">…</div>
```

który powoduje utworzenie nowej strony przeznaczonej na stopkę redakcyjną. Wewnątrz tego bloku mogą zostać umieszczone zarówno akapity jak i listy numerowane lub punktowane, oraz inne elementy.

### Rozdziały

Do tytułowania i oddzielania rozdziałów, podrozdziałów i mniejszych partii dokumentu, w ramach „CSS Document” zdefiniowane zostały nagłówki sześciu poziomów: `h1`, `h2`, `h3`, `h4`, `h5` oraz `h6`. Nagłówki h1 składane są na wydruku począwszy od nowej strony, pozostałe natomiast – w sposób ciągły.

Włączając _javascript_ opisany w podrozdziale …… nagłówki od `h1` do `h4` uzupełniane będą automatycznie numeracją urzędową – jak to widać powyżej tego akapitu.

Nagłówki wstępu, przedmowy, zakończenia, dodatków etc. zazwyczaj nie posiadają numeracji. Aby wstrzymać dodawanie numeracji do nagłówka należy użyć klasy _nonumber_, np. `<h1 class="nonumber">…</h1>`. Należy jednak pamiętać, iż nie wstrzymuje to numerowania podrozdziałów! Z tego powodu stosując klasę nonumber do danego nagłówka nadrzędnego, wymagane jest dopisywanie jej do wszystkich nagłówków niższych rzędów.

### Akapity

Treść akapitów obejmuje się, zgodnie ze standardem HTML w znaczniki `p`. Wszystkie akapity, poza pierwszym, posiadają wcięcie pierwszej linii. W sytuacji, kiedy wcięcie akapitowe nie jest pożądane (np. kontynuując akapit po liście wypunktowanej lub numerowanej), znacznik p należy uzupełnić klasą _noindent_: `<p class="noindent">…</p>` (patrz przykład w podrozdziale …… poświęconym listom).

Wszystkie akapity, włącznie z pierwszym, są justowane (wyrównane zarówno do lewej, jak i prawej strony). Aby wymusić wyrównanie tylko do lewej lub prawej strony, albo do środka, należy posłużyć się klasami _left_, _right_ albo _center_, jak na przykładzie poniżej:

```html
<p class="left">…<p>
<p class="right">…<p>
<p class="center">…<p>
```

Użycie klas _left_, _right_ albo _center_ nie wyłącza wcięcia akapitowego. Aby poprawić wyrównanie akapitów wyśrodkowanych zaleca się użycie dodakowo klasy _noindent_, tj. `<p class="center noindent">…<p>`.

Treść dokumentu domyślnie składana jest w jednej kolumnie. Dla wyróżnienia pewnych fragmentów można złożyć go w dwóch kolumnach równej szerokości. W tym celu należy użyć klasy _twocolumns_ wg. poniższych przykładów. _Pamiętaj!_ Ten styl nie jest interpretowany przez wszystkie przeglądarki. Szczególnie starsze mogą go pomijać i wyświetlać tekst w jednej szpalcie.

Najprościej zastosować klasę twocolumns do pojedynczego akapitu poprzez użycie polecenia `<p class="twocolumns">…</p>`.

Jeżeli w obrębie tekstu dwukolumnowego chcemy zawrzeć więcej niż jeden akapit, poszczególne akapity oznaczamy zwyczajnie, tj. jako z (bez klasy _twocolumns_), natomiast wszystkie te akapity obejmujemy w znacznik `<div class="twocolumns">…</div>`, tj.

```html
<div class="twocolumns">
    <p>…</p>
    <p>…</p>
</div>
```

Wszystkie akapity wewnątrz bloku dwukolumnowego `<div class="twocolumns">` posiadają wcięcie pierwszego wiersza.

W układzie dwukolumnowym można składać również inne elementy strony, np.:

* listy wypunktowane i numerowane;
* tabele;
* ilustracje.

### Listy

Specyfikacja „CSS Document” posiada zdefiniowane style list: wypunktowanej `ul`, numerowanej `ol` oraz definicyjnej `dl`.

#### Lista wypunktowana

Lista wypunkowana prezentuje się jak poniżej:

```html
<ul>
	<li>…</li>
	<li>…</li>
	<li>…</li>
</ul>
```

#### Lista numerowana

Listę numerowaną tworzymy za pomocą poleceń:

```html
<ol>
	<li>…</li>
	<li>…</li>
	<li>…</li>
</ol>
```

#### Lista definicyjna

Dodatkowo można tworzyć listy definicyjne:

```html
<dl>
    <dt>hasło</dt>
        <dd>definicja</dd>
    <dt>hasło</dt>
        <dd>definicja</dd>
</dl>
```

### Ilustracje

Aby umieścić w dokumencie ilustrację z podpisem stosujemy następującą sekwencję poleceń:

```html
<p class="image" id="rysKotek">
    <img src="… … …" /><br />
    <span class="title">opis rysunku</span>
</p>
```

Włączając _javascript_ opisany w podrozdziale …… wszystkie rysunki uzyskują automatycznie numerację urzędową (analogiczną do numeracji nagłówków), z przedrostkiem „Rys.”. Numeracja jest ciągła w obrębie rozdziału (nagłówka `h1`).

Identyfikator `id` (w przykładzie „rysKotek”) służy do odwołania się wewnątrz dokumentu do danej ilustracji – patrz podrozdział …….

Ilustracje można również zamieszczać bezpośrednio w tekście, wówczas używamy jedynie znacznika `<img src="…" />`.

### Tabele

Specyfikacja „CSS Document” zawiera predefiniowane style do formatowania tabel `table`: wszystkie tabele rozciągane są do pełnej szerokości strony, posiadają naprzemiennie kolorowane wiersze, nagłówek oddzielony jest wyraźniejszą linią, a komórki uzyskują delikatne obramowanie. Nagłówki kolumn `th` składane są z wyróżnieniem tła, pogrubieniem czcionki oraz wyśrodkowaniem tekstu. Pozostałe komórki `td` – z zawartością wyrównaną do lewej.

Aby wymusić wyrównanie tekstu do lewej lub do prawej krawędzi komórki, albo do środka jej szerokości, znacznik `td` należy uzupełnić o klasę _left_, _right_ albo _center_, tj. np. `<td class="center">… … …</td>`.

W celu nadania tabeli opisu wystarczy w obrębie znacznika `table` dodać polecenie `<caption>…</caption>`. Dodatkowo włączając _javascript_ opisany w podrozdziale …… wszystkie tabele uzyskują automatyczną numerację urzędową (analogiczną do numeracji nagłówków), z przedrostkiem „Tabela”. Numeracja ta jest ciągła w obrębie rozdziału (nagłówka `h1`).

Dodatkowy identyfikator _id_ dla znacznika `table` służy do odwołania się wewnątrz dokumentu do danej tabeli – patrz podrozdział …….

Zbiorczo, opisane powyżej możliwości formatowania tabel przedstawia poniższy kod źródłowy:

```html
<table id="tblPrzyklad">
    <caption>Przykład wyrównywania zawartości komórek tabeli</caption>
    <thead>
        <tr>
            <th class="left">wyrównanie do lewej</th>
            <th class="center">wyrównanie do środka</th>
            <th class="right">wyrównanie do prawej</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="left">tekst</td>
            <td class="center">inny tekst</td>
            <td class="right">1600 €</td>
        </tr>
        <tr>
            <td class="left">tekst</td>
            <td class="center">12 grudnia 2016</td>
            <td class="right">12 €</td>
        </tr>
        <tr>
            <td class="left">tekst</td>
            <td class="center">inny tekst</td>
            <td class="right">1 €</td>
        </tr>
    </tbody>
</table>
```

### Odnośniki

#### Odnośniki do dokumentów zewnętrznych

Odnośniki do dokumentów zewnętrznych (plików, stron WWW, etc.) tworzymy z użyciem standardowego polecenia HTML `a`: `<a href="www.google.pl">Google</a>`

#### Odnośniki do elementów w danym dokumencie

Odwołania do elementów w danym dokumencie tworzymy zgodnie z regułami języka HTML:

* znacznik elementu, do którego chcemy się odwołać uzupełniamy unikatowym identyfikatorem _id_,
* parametr `href` odnośnika `a` uzyskuje ww. unikatowy identyfikator poprzedzony znakiem #.

W specyfikacji „CSS Document”, dla odnośników wskazujących na elementy w danym dokumencie, stworzona została klasa _ref_. Dodanie jej do odnośnika `a` (tj. użycie polecenia `<a href="#hNagNumer" class="ref">rozdziale</a>`) razem z użyciem _javascript_ opisanego w podrozdziale ……, włącza dodatkową numerację referencyjną. Na przykład otrzymujemy wówczas odnośniki typu: „szczegóły opisane są w podrozdziale 1.2”, „jest to przedstawione na rysunku 2.1” albo „wartości współczynników zamieszczono w tabeli 2.2”.

Ostatecznie:

```html
<h1 id="hNagNumer">Rozdział drugi</h1>
…
…
<a href="#hNagNumer" class="ref">rozdziale</a>
```

przy czym treść odnośnika (w przykładzie słowo „rozdziale”) nie jest zmieniane podczas dodawania numeracji referencyjnej, tak więc należy ją dostosować do kontekstu zdania podając właściwą nazwę wskazywanego obiektu (rozdział, podrozdział, rysunek, tabela), oraz stosując właściwą jego odmianę (rozdział, rozdziału, rozdziale).

## Formatowanie tekstu

### Formatowania „w tekście”

Do wyróżnienia fragmentu tekstu w dokumencie (jedno słowo lub więcej słów wewnątrz bloku akapitu `p`) służą polecenia wymienione w poniższej tabeli:

polecenie | efekt działania | przykład zastosowania
---|---|---
— | zwykły tekst | normalny tekst akapitu
`<em>…</em>` | kursywa | delikatne wyróżnienie
`<strong>…</strong>` | pogrubienie | silne wyróżnienie
`<code>…</code>` | pismo maszynowe | kod źródłowy, polecenie komputerowe, etc.
`<tt>…</tt>` | pismo maszynowe | kod źródłowy, polecenie komputerowe, etc.
`<span class="s">…</span>` | przekreślenie | wskazanie błędu, etc.
`<span class="u">…</span>` | podkreślenie | oznaczenie odnośnika internetowego; wyróżnienie hasła indeksu
`<span class="w">…</span>` | rozstrzelenie | wskazanie na przeczytanie tekstu ze zwiększoną uwagą
`<mark>…</mark>` | zmiana tła na żółtą | fragment, na który warto zwrócić uwagę<sup>*</sup>
`<del>…</del>` | przekreślenie i zmiana tła na czerwoną | fragment wykreślony względem poprzedniej wersji dokumentu<sup>*</sup>
`<ins>…</ins>` | podkreślenie i zmiana tła na zieloną | fragment dopisany względem poprzedniej wersji dokumentu<sup>*</sup>

<sup>*</sup> Wyróżnienia `mark`, `del` oraz `ins` dodają lub zmienią tło pod tekstem. Jeżeli podczas drukowania strony w przeglądarce internetowej zostanie wyłączone drukowania teł, polecenia te stracą (całkowicie lub częściowo) swoje właściwości.

### Formatowanie bloków tekstu

#### Cytaty

Cytaty oznaczamy znacznikiem `blockquote` (z pominięciem obejmującego go `p`). Taki fragment wyróżniony jest większym marginesem z lewej strony oraz zredukowaną interlinią. Ponadto jest odsunięty z góry i z dołu od tekstu właściwego dokumentu.

```html
<blockquote>Taki cytat zawiera jeden, długi akapit, jednakże bez dodatkowego wcięcia pierwszego wiersza. Wewnątrz cytowanego tekstu można stosować wyróżnienienia, np. <em>kursywę</em> lub <strong>pogrubienie</strong>. Tekst bloku cytowanego jest justowana, czyli wyrównana do lewej i prawej krawędzi strony.</blockquote>
```

W razie potrzeby zacytowania więcej niż jednego akapitu, listy (wypunktowanej lub numerowanej) albo ilustracji, można odpowiednie bloki `p`, `ol`, `ul` albo definiujące ilustrację z podpisem (opisane w rozdziale ……) objąć wspólnie blokiem blockquote:

```html
<blockquote>
    <p>…</p>
    <p>…</p>
    <ul>
        <li>…</li>
        <li>…</li>
    </ul>
    …
    …
</blockquote>
```

Możliwe jest również zagnieżdżanie cytowań na kształt popularnych na formach dyskusyjnych i w mediach społecznościowych „komentarzy do komentarzy”. Należy jednak pamiętać, że każde dodatkowe, „wewnętrzne” cytowanie przesuwa lewą krawędź tekstu coraz to bardziej w prawo. Przy zbyt dużej liczbie zagnieżdżeń szerokość kolumny tekstu może stać się zbyt mała do poprawnego wyświetlania treści.

#### Kod źródłowy

…