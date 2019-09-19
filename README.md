# Specyfikacja CSS Document – arkusz stylów dokumentu drukowanego

## Wstęp

Niniejszy dokument stanowi opis specyfikacji „CSS Document”, a jednocześnie przykład jej zastosowania. Specyfikacja ta służy do przygotowywana broszur, książek, prac naukowych i innych dokumentów w postaci plików HTML, wyglądem jak najbardziej zgodnych z regułami profesjonalnego składu takich dokumentów w wersji drukowanej<sup>*</sup>. Poniżej zostały zaprezentowane elementy języka HTML, do których zdefiniowano odpowiednie style CSS<sup>**</sup>, oraz opisane funkcjonalności uzupełniane narzędziami _javascript_.

_Pamiętaj!_ Specyfikacja „CSS Document” jest specyfikacją cały czas otwartą, poprawianą i aktualizowaną. Dlatego też przed użyciem jej w docelowym dokumencie sprawdź aktualność wersji.

<sup>*</sup> Wygląd sformatowanego dokumentu (tj. zgodność z prawidłami składu tekstów drukowanych) zależy od wykorzystanej przeglądarki internetowej. Przyczynia się do tego fakt, że niektóre przeglądarki – nawet w najnowszych wersjach – mogą nie mieć zaimplementowanej obsługi wszystkich poleceń CSS zastosowanych w specyfikacji „CSS Document”.

<sup>**</sup> Elementy języka HTML nie opisane w niniejszej specyfikacji formatowane będą zgodnie z predefiniowanymi stylami wykorzystywanej przeglądarki internetowej.

## Przygotowanie dokumentu

### Pliki do pobrania

Aby stosować specyfikację „CSS Document” w pierwszym kroku należy pobrać ze strony projektu wskazane poniżej pliki _.js_ oraz _.css_:

* _document.css_ – główny plik stylów CSS;
* _document.js_ – implementuje funkcje automatyzujące tworzenie dokumentu (np. numerację nagłówków, rysunków i tabel) oraz pozwalające stosować odnośniki wewnątrz dokumentu.

Dodatkowo udostępnione zostały następujące pliki mogące służyć za żywy przykład implementacji specyfikacji „CSS Document”:

* _index.html_ – niniejszy dokument;
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

…