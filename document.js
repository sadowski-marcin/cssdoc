/*
Szablon CSS dokumentu do druku
wersja 1.2

Copyright © 2015-2019 by Marcin Paweł Sadowski <sadowski.marcin@icloud.com>
https://github.com/sadowski-marcin/cssdoc
*/

function fillLeft(character, number) {
	var i, tmp;
	tmp = "";
	if (number>0) {
		for (i = 0; i < number; i++) {
			tmp = tmp + character;
		}
	}
	return tmp;
}

function paddingLeft(text) {
	var tmp = text.replace(/^\s+/,"");
	return (text.length - tmp.length);
}

function decodeHTMLEntities(text) {
    var entities = [
        ['&nbsp;', '·', 160],
        ['&lt;', '<', 60],
        ['&gt;', '>', 62],
        ['&amp;', '&', 38],
        ['&quot;', '"', 34],
        ['&apos;', '\'', 39]
    ];
	var i, max;
	max = entities.length;
    for (i = 0; i < max; i++) {
    	var re = new RegExp(entities[i][0], 'g')
        text = text.replace(re, entities[i][1]);
    }

    return text;
}

window.onload = function () {
    var all = document.getElementsByTagName("*"),
        hcounters = [0, 0, 0, 0, 0, 0], /* h1, h2, h3, h4, h5, h6 */
        fcounters = [0, 0, 0, 0, 0], /* img, tbl, eq, footnotes, bibliography */
        fotnoteschrs = ["∗", "†", "‡", "¶", "∗∗", "††", "‡‡", "¶¶", "∗∗∗", "†††", "‡‡‡", "¶¶¶", "∗∗∗∗", "††††", "‡‡‡‡", "¶¶¶¶", "∗∗∗∗∗", "†††††", "‡‡‡‡‡", "¶¶¶¶¶"],
//         lowast, dagger, Dagger, para
        toc = [], /* 0 = id; 1 = numer; 2 = opis; 3 = rodzaj */
        htoc = [], /* spis treści nagłówków */
        i,
        j,
        k,
        href,
        uniqueids,
        idstbl = [],
        tmp;

    uniqueids = true;

    for (i = 0; i < all.length; i++) {
        var elementid = all[i].getAttribute('id');
        if (elementid!="" && elementid!=null) {
            if (idstbl.indexOf(elementid) >= 0) {
                uniqueids = false;
                alert("CSS Document\r\n\r\nZnaleziono zdublowany identyfikator „#"+elementid+"”!\r\n\r\nNapraw ten problem i odśwież stronę, aby uruchomić skrypt obsługi dokumentu (numerowanie elementów, odwołania, etc.).");
                break;
            } else {
                idstbl.push(elementid);
            }
        }
    }
    if (uniqueids) {
        /* numeracja nagłówków, rysunków, tabel */
        for (i = 0; i < all.length; i++) {
            /* nagłówki */
            if (all[i].tagName == "H1" && !all[i].classList.contains("nonumber")) {
                hcounters[0]++;
                hcounters[1] = 0; /* h2 */
                fcounters[0] = 0; /* img */
                fcounters[1] = 0; /* tbp */
                fcounters[2] = 0; /* eq */
                fcounters[3] = 0; /* footnotes */
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,hcounters[0],all[i].textContent,"H1\n\n"]);
                }
                all[i].innerHTML = hcounters[0] + ". " + all[i].innerHTML;
            }
            if (all[i].tagName=="H2" && !all[i].classList.contains("nonumber")) {
                hcounters[1]++;
                hcounters[2] = 0;
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,hcounters[0]+"."+hcounters[1],all[i].textContent,"H2\n\n"]);
                }
                all[i].innerHTML = hcounters[0]+"."+hcounters[1]+". "+all[i].innerHTML;
            }
            if (all[i].tagName=="H3" && !all[i].classList.contains("nonumber")) {
                hcounters[2]++;
                hcounters[3] = 0;
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,hcounters[0]+"."+hcounters[1]+"."+hcounters[2],all[i].textContent,"H3\n\n"]);
                }
                all[i].innerHTML = hcounters[0]+"."+hcounters[1]+"."+hcounters[2]+". "+all[i].innerHTML;
            }
            if (all[i].tagName=="H4" && !all[i].classList.contains("nonumber")) {
                hcounters[3]++;
                hcounters[4] = 0;
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,hcounters[0]+"."+hcounters[1]+"."+hcounters[2]+"."+hcounters[3],all[i].textContent,"H4\n\n"]);
                }
                all[i].innerHTML = hcounters[0]+"."+hcounters[1]+"."+hcounters[2]+"."+hcounters[3]+". "+all[i].innerHTML;
            }
            /* rysunki */
            if (all[i].tagName == "P" && all[i].className == "image") {
                fcounters[0]++;
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,hcounters[0]+"."+fcounters[0],all[i].textContent,"IMG\n\n"]);
                }
                for (j = 0; j < all[i].childNodes.length; j++) {
                    if (all[i].childNodes[j].tagName == "SPAN" && all[i].childNodes[j].className == "title") {
                        all[i].childNodes[j].innerHTML = "Rys. "+hcounters[0]+"."+fcounters[0]+". "+all[i].childNodes[j].innerHTML;
                    }
                }
            }
            /* tabele */
            if (all[i].tagName == "TABLE") {
                fcounters[1]++;
                var elementid = all[i].getAttribute('id'),
                    title;
                for (j = 0; j < all[i].childNodes.length; j++) {
                    if (all[i].childNodes[j].tagName == "CAPTION") {
                        title = all[i].childNodes[j].innerHTML;
                    }
                }
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,hcounters[0]+"."+fcounters[1],title,"TBL\n\n"]);
                }
                for (j = 0; j < all[i].childNodes.length; j++) {
                    if (all[i].childNodes[j].tagName == "CAPTION") {
                        all[i].childNodes[j].innerHTML = "Tabela "+hcounters[0]+"."+fcounters[1]+". "+all[i].childNodes[j].innerHTML;
                    }
                }
            }
            /* równania */
            /* numeracja równań obsługiwana jest poprzez skrypt MathJax */
            /* przypisy dolne */
            if (all[i].tagName == "P" && all[i].className == "footnote") {
                fcounters[3]++;
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
//                     toc.push([elementid,hcounters[0]+"."+fcounters[3],all[i].textContent]);
                    toc.push([elementid,fcounters[3],all[i].textContent,"FNT\n\n"]);
//                     toc.push([elementid,fotnoteschrs[fcounters[3]-1],all[i].textContent]);
                }
//                 all[i].innerHTML = hcounters[0]+"."+fcounters[3]+". "+all[i].innerHTML+' <a href="#footnote'+hcounters[0]+'.'+fcounters[3]+'" class="noprint">↩</a>';
                all[i].innerHTML = "<span class=\"fntnumber\">"+fcounters[3]+".</span> "+all[i].innerHTML+' <a href="#footnote'+elementid+'" class="noprint">↩</a>';
//                 all[i].innerHTML = "<sup>"+fotnoteschrs[fcounters[3]-1]+"</sup> "+all[i].innerHTML+' <a href="#footnote'+elementid+'" class="noprint">↩</a>';
            }
            /* bibliografia */
            if (all[i].tagName == "P" && all[i].className == "bib") {
                fcounters[4]++;
                var elementid = all[i].getAttribute('id');
                if (elementid!="" && elementid!=null) {
                    toc.push([elementid,fcounters[4],all[i].textContent,"BIB\n\n"]);
                }
                all[i].title = all[i].getElementsByClassName("bibname")[0].innerHTML;
                all[i].getElementsByClassName("bibname")[0].innerHTML = "["+fcounters[4]+"] ";
            }
        }

        /* dopisywanie numerów nagłówków, rysunków, tabel do adnośników <a href="…" class="ref">…</a>  */
        if (toc.length > 0) {
            for (i = 0; i < all.length; i++) {
                if (all[i].tagName == "A" && all[i].className == "ref") {
                    href = all[i].getAttribute("href");
                    for (j = 0; j < toc.length; j++) {
                        if (toc[j][0] == href.substr(1)) {
                            all[i].innerHTML = all[i].innerHTML + " " + toc[j][1];
                            all[i].title = toc[j][2];
                            break;
                        }
                    }
                }
                if (all[i].tagName == "A" && all[i].className == "fnref") {
                    href = all[i].getAttribute("href");
                    for (j = 0; j < toc.length; j++) {
                        if (toc[j][0] == href.substr(1)) {
                            all[i].innerHTML = toc[j][1];
                            all[i].setAttribute("id","footnote"+toc[j][0]);
                            all[i].title = toc[j][2];
                            break;
                        }
                    }
                }
                if (all[i].tagName == "A" && all[i].className == "bibref") {
                    href = all[i].getAttribute("href");
                    for (j = 0; j < toc.length; j++) {
                        if (toc[j][0] == href.substr(1)) {
                            all[i].innerHTML = "["+toc[j][1]+"]";
                            all[i].title = toc[j][2];
                            break;
                        }
                    }
                }
            }
        }

        /* tworzenie spisu treści */
        for (i = 0; i < all.length; i++) {
        	if (all[i].nodeName == "H1" || all[i].nodeName == "H2" || all[i].nodeName == "H3" || all[i].nodeName == "H4") {
	        	if (!all[i].classList.contains("notoc")) {
	        		if (all[i].id.length == 0) {
	        			all[i].id = "toc" + i;
	        		}
	        		htoc.push([all[i].nodeName,all[i].innerHTML,all[i].id,"<br />"]);
	        		all[i].innerHTML = all[i].innerHTML + " <a href=\"#" + all[i].id + "\" class=\"headerlink\" title=\"odnośnik do tego nagłówka\">#</a><a href=\"#toc\" class=\"tocreturn\" title=\"powrót do spisu treści\">↑</a>";
				}
        	}
        }
        if (document.getElementById('toc')) {
        	var tocdiv = document.getElementById('toc');
        	var itemlevel, toclevel;
        	toclevel = 0;
        	tocdiv.innerHTML = "<h1>Spis treści</h1>";
        	tmp = "<div id=\"toccontent\">";
        	for (i = 0; i < htoc.length; i++) {
        		if (htoc[i][0] == "H1") { itemlevel = 1; }
        		else if (htoc[i][0] == "H2") { itemlevel = 2; }
        		else if (htoc[i][0] == "H3") { itemlevel = 3; }
        		else { itemlevel = 4; }

				if (itemlevel>toclevel) {
					while (toclevel<itemlevel) {
						tmp = tmp + "<ul>\n";
						tmp = tmp + "<li>";
						toclevel++;
					}
				} else if(itemlevel<toclevel) {
					while (toclevel>itemlevel) {
						tmp = tmp + "</li>\n";
						tmp = tmp + "</ul>\n";
						toclevel--;
					}
					tmp = tmp + "</li>\n";
				tmp = tmp + "<li>";
				} else {
					tmp = tmp + "</li>\n";
					tmp = tmp + "<li>";
				}
	        	tmp = tmp + "<a href=\"#" + htoc[i][2] + "\">" + htoc[i][1] + "</a></li>";
        	}
			toclevel = 0;
			while (itemlevel>toclevel) {
				tmp = tmp + "</li>\n";
				tmp = tmp + "</ul>\n";
				itemlevel--;
			}
			tmp = tmp + "</div>";
			tocdiv.innerHTML = tocdiv.innerHTML + tmp;
    	}
    }

	/* formatowanie kodów źródłowych <pre> */
// 	var pres = document.getElementsByTagName("pre");
// 	var lines, tmp, pre, firstline;
// 	var maxlength = 58;
// 	var line;
// 	for (i = 0; i < pres.length; i++) {
// 		lines = pres[i].innerHTML.split('\n');
// 		maxlengthitem = maxlength;
// 		maxlengthitem = maxlengthitem - 3;
// 		if (lines.length > 9) { maxlengthitem = maxlengthitem - 1; }
// 		if (lines.length > 99) { maxlengthitem = maxlengthitem - 1; }
// 		for (j = 0; j < lines.length; j++) {
// 			firstline = 1;
// 			tmp = "";
// 			line = decodeHTMLEntities(lines[j]);
// 			while (line.length > maxlengthitem) {
// 				pre = "";
// 				if (firstline == 1) {
// 					if (j < 9 && lines.length > 9) { pre = pre + "0"; }
// 					if (j < 99 && lines.length > 99) { pre = pre + "0"; }
// 					pre = pre + (j+1) + "| ";
// 					firstline = 0;
// 				} else {
// 					if (lines.length > 9) { pre = pre + " "; }
// 					if (lines.length > 99) { pre = pre + " "; }
// 					pre = pre + " | ";
// 				}
// 				tmp = tmp+pre+line.substr(0,maxlengthitem)+"↩︎\n";
// 				line = fillLeft(" ", paddingLeft(lines[j])) + "  " + line.substr(maxlengthitem);
// 			}
// 			pre = "";
// 			if (firstline == 1) {
// 				if (j < 9 && lines.length > 9) { pre = pre + "0"; }
// 				if (j < 99 && lines.length > 99) { pre = pre + "0"; }
// 				pre = pre + (j+1) + "| ";
// 				firstline = 0;
// 			} else {
// 				if (lines.length > 9) { pre = pre + " "; }
// 				if (lines.length > 99) { pre = pre + " "; }
// 				pre = pre + " | ";
// 			}
// 			tmp = tmp+pre+line;
// 			lines[j] = tmp;
// 		}
// 		pres[i].textContent = lines.join("\n");
//     }
};
