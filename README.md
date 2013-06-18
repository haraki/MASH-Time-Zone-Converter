# MASH Time Zone Converter

"MASH Time Zone Converter" はスマートフォン向けに最適化されたタイムゾーン変換Webアプリです。

## Overview


## Setup

下記のモジュールが必要になります。

 モジュール             | URL                                               | 必要なファイル
------------------------|---------------------------------------------------|------------------------------------
 jQuery                 | http://jquery.com                                 | jquery-1.8.3.min.js
 jquery-cookie          | https://github.com/carhartl/jquery-cookie         | jquery-cookie.js
 jquery.i18n.properties | https://code.google.com/p/jquery-i18n-properties/ | jquery.i18n.properties-min-1.0.9.js
 jQueryMobile           | http://jquerymobile.com                           | jquery.mobile-1.2.1.min.js
                        |                                                   | jquery.mobile-1.2.1.min.css
 jQM-DateBox            | http://dev.jtsage.com/jQM-DateBox2/               | jqm-datebox.core.min.js
                        |                                                   | jqm-datebox.mode.datebox.min.js
 timezone-js            | https://github.com/mde/timezone-js                | date.js
 tz database            | http://www.iana.org/time-zones                    | tzdata2013c.tar.gz
                        |                                                   | tzcode2013c.tar.gz

* jQuery (http://jquery.com)
  jquery-1.8.3.min.js を /jquery にダウンロード。

* jquery-cookie (https://github.com/carhartl/jquery-cookie)
  jquery-cookie.js を /jquery にダウンロード。

* jquery.i18n.properties (https://code.google.com/p/jquery-i18n-properties/)
  jquery.i18n.properties-min-1.0.9.js を /jquery にダウンロード。

* jQueryMobile (http://jquerymobile.com) 
  jquery.mobile-1.2.1.min.js, jquery.mobile-1.2.1.min.css を /jqm にダウンロード。
  ajax-loader.gif, icons-18-black.png, icons-18-white.png, icons-36-black.png, icons-36-white.png を /jqm/i18n にダウンロード。

* jQM-DateBox (http://dev.jtsage.com/jQM-DateBox2/)
  jqm-datebox.core.min.js, jqm-datebox.mode.datebox.min.js を /jqm-datebox にダウンロード。
  datebox.png を /jqm-datebox/image にダウンロード。
  jquery.mobile.datebox.i18n.en.utf8.js, jquery.mobile.datebox.i18n.ja.utf8.js を /i18n にダウンロード。

* timezone-js (https://github.com/mde/timezone-js)
  date.js を /timezone-js にダウンロード。

* tz database (http://www.iana.org/time-zones)
    * tzdata2013c.tar.gz
    * tzcode2013c.tar.gz

## Language

日本語と英語に対応しています。
他の言語に対応したい場合は、i18nディレクトリに下記ファイルを追加する必要があります。

* jquery.mobile.datebox.i18n.{language}.utf8.js
* country.{language}.json
* timezone.{language}.json
* Message_{language}.json

## License

The MIT License (MIT)

Copyright (c) 2013 Masashi Haraki (masa.haraki@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
