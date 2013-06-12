/*
 * Copyright 2013 Masashi Haraki (masa.haraki@gmail.com)
 */

var countryData;
var timezoneData;
var i18nDir = "./i18n/";
var tzDataDir = "./tz/";
var language = "en";
var cookieRaw;
var cookieExpires = 7;

/*
 * Initialize
 */

function initialize(mode)
{
	switch(mode)
	{
	case 'cookie':
		initializeCookie();
		
		initialize('properties');
		
		break;
		
	case 'properties':
		$.i18n.properties({name:'Messages', path:i18nDir, mode:'both', language:language, callback:function(){ initialize('country_json'); }});
		
		break;
		
	case 'country_json':
		$.getJSON(COUNTRY_JSON_FILE, function(ctData, status){ countryData = ctData; initialize('timezone_json'); });
		
		break;
		
	case 'timezone_json':
		$.getJSON(TIMEZONE_JSON_FILE, function(tzData, status){ timezoneData = tzData; initialize('datebox'); });
		
		break;
		
	case 'datebox':
		$.getScript(DATEBOX_FILE, function(data, status){ initializeDateBoxAll(); initialize('timezone'); });
		
		break;
		
	case 'timezone':
		timezoneJS.timezone.zoneFileBasePath = tzDataDir;
		timezoneJS.timezone.init({ callback: function(){ initialize('page'); }});
		
		break;
		
	case 'page':
		initializePage();
		
		break;
		
	}
}

function initializeCookie()
{
	$.cookie.json = true;
	
	var cr = $.cookie('option');
	if(cr != undefined)
	{
		cookieRaw = cr;
	}
	
	var languageCookie = getCookie('language');
	if((languageCookie != undefined) && (languageCookie != ""))
	{
		language = languageCookie;
	}
	
	setCookie('language', language);
}

function initializeDateBoxAll()
{
	initializeDateBox("#src_date");
	initializeDateBox("#src_time");
	initializeDateBox("#dst_date");
	initializeDateBox("#dst_time");
}

function initializeDateBox(databoxId)
{
	$(databoxId).data('datebox').options.overrideSetDateButtonLabel     = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setDateButtonLabel;
	$(databoxId).data('datebox').options.overrideSetTimeButtonLabel     = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setTimeButtonLabel;
	$(databoxId).data('datebox').options.overrideSetDurationButtonLabel = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setDurationButtonLabel;
	$(databoxId).data('datebox').options.overrideCalTodayButtonLabel    = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].calTodayButtonLabel;
	$(databoxId).data('datebox').options.overrideTitleDateDialogLabel   = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].titleDateDialogLabel;
	$(databoxId).data('datebox').options.overrideTitleTimeDialogLabel   = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].titleTimeDialogLabel;
	$(databoxId).data('datebox').options.overrideDaysOfWeek             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].daysOfWeek;
	$(databoxId).data('datebox').options.overrideDaysOfWeekShort        = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].daysOfWeekShort;
	$(databoxId).data('datebox').options.overrideMonthsOfYear           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].monthsOfYear;
	$(databoxId).data('datebox').options.overrideMonthsOfYearShort      = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].monthsOfYearShort;
	$(databoxId).data('datebox').options.overrideDurationLabel          = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].durationLabel;
	$(databoxId).data('datebox').options.overrideDurationDays           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].durationDays;
	$(databoxId).data('datebox').options.overrideTooltip                = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].tooltip;
	$(databoxId).data('datebox').options.overrideNextMonth              = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].nextMonth;
	$(databoxId).data('datebox').options.overridePrevMonth              = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].prevMonth;
	$(databoxId).data('datebox').options.overrideTimeFormat             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].timeFormat;
	$(databoxId).data('datebox').options.overrideHeaderFormat           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].headerFormat;
	$(databoxId).data('datebox').options.overrideDateFieldOrder         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].dateFieldOrder;
	$(databoxId).data('datebox').options.overrideTimeFieldOrder         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].timeFieldOrder;
	$(databoxId).data('datebox').options.overrideSlideFieldOrder        = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].slideFieldOrder;
	$(databoxId).data('datebox').options.overrideDateFormat             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].dateFormat;
	$(databoxId).data('datebox').options.overrideUseArabicIndic         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].useArabicIndic;
	$(databoxId).data('datebox').options.overrideIsRTL                  = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].isRTL;
	$(databoxId).data('datebox').options.overrideCalStartDay            = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].calStartDay;
	$(databoxId).data('datebox').options.overrideClearButton            = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].clearButton;
}

function initializePage()
{
	$("#msg_title").text(TITLE);
	$("#msg_from").text(FROM);
	$("#msg_to").text(TO);
	$("#msg_sel_country_src").text(SELECT_COUNTRY);
	$("#msg_sel_country_dst").text(SELECT_COUNTRY);
	$("#msg_sel_city_src").text(SELECT_CITY);
	$("#msg_sel_city_dst").text(SELECT_CITY);
	$("#msg_set_current_time").children('.ui-btn-inner').children('.ui-btn-text').text(SET_CURRENT_TIME);
	
	for(var i = 0;i < countryData.length;i++)
	{
		var option_str = "<option value = \"" + countryData[i].country + "\">" + countryData[i].country_name + "</option>";
		
		$("#src_country").append(option_str);
		$("#dst_country").append(option_str);
	}
	
	checkCookie('src_country', "#src_country", 'src_zone', '#src_city');
	checkCookie('dst_country', "#dst_country", 'dst_zone', '#dst_city');
	
	$("#src_country").selectmenu('refresh', true);
	$("#dst_country").selectmenu('refresh', true);
	$("#src_city").selectmenu('refresh', true);
	$("#dst_city").selectmenu('refresh', true);
	
	$("#language").val(language);
	$("#language").selectmenu('refresh', true);
	
	setSrcCurrentDateTime();
	
	translateTimeZone();
	
	$("#initialize").hide();
	$("#main").show();
}

/*
 * Internal Function
 */

function setCookie(cookieName, cookieValue)
{
	if(cookieRaw == undefined)
	{
		cookieRaw = new Object();
	}
	
	cookieRaw[cookieName] = cookieValue;
	
	writeCookie();
}

function writeCookie()
{
	$.cookie('option', cookieRaw, { expires:cookieExpires });
}

function getCookie(cookieName)
{
	if(cookieRaw != undefined)
	{
		return cookieRaw[cookieName];
	}
	
	return undefined;
}

function checkCookie(countryCookieName, countrySelectId, zoneCookieName, citySelectId)
{
	var countryCookie = getCookie(countryCookieName);
	if((countryCookie != undefined) && (countryCookie != ""))
	{
		$(countrySelectId).val(countryCookie);
		
		var firstValue = setCitySelect(citySelectId, countryCookie);
		
		var zoneCookie = getCookie(zoneCookieName);
		if((zoneCookie != undefined) && (zoneCookie != ""))
		{
			$(citySelectId).selectmenu('enable');
			
			$(citySelectId).val(zoneCookie);
		}
		else if((firstValue != undefined) && (firstValue != ""))
		{
			$(citySelectId).selectmenu('enable');
			
			$(citySelectId).val(firstValue);
		}
	}
}

function clearCitySelect(cityId)
{
	var len = $(cityId).children().length;
	for(var i = 1;i < len;i++)
	{
		$(cityId).children('option:last-child').remove();
	}
}

function setCitySelect(cityId, country)
{
	var firstValue = "";
	
	for(var i = 0;i < timezoneData.length;i++)
	{
		if(timezoneData[i].country == country)
		{
			var option_str = "<option value = \"" + timezoneData[i].tz + "\">" + timezoneData[i].city_name + "</option>";
			
			$(cityId).append(option_str);
			
			if(firstValue == "")
			{
				firstValue = timezoneData[i].tz;
			}
		}
	}
	
	return firstValue;
}

function setSrcCurrentDateTime(srcZone)
{
	var srcZone = $("#src_city").val();
	if(srcZone != "")
	{
		var tzDate = new timezoneJS.Date();
		tzDate.setTimezone(srcZone);
		
		var srcDate = new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate(), tzDate.getHours(), tzDate.getMinutes(), 0, 0);
		
		$("#src_date").datebox('setTheDate', srcDate);
		$("#src_date").trigger('datebox', {'method' : 'doset'});
		$("#src_time").datebox('setTheDate', srcDate);
		$("#src_time").trigger('datebox', {'method' : 'doset'});
	}
}

function translateTimeZone()
{
	var srcZone    = $("#src_city").val();
	var dstZone    = $("#dst_city").val();
	var srcDateVal = $("#src_date").val();
	var srcTimeVal = $("#src_time").val();
	
	if((srcZone == undefined) || (srcZone == "") || (dstZone == undefined) || (dstZone == "") ||
	   (srcDateVal == undefined) || (srcDateVal == "") || (srcTimeVal == undefined) || (srcTimeVal == ""))
	{
		return;
	}
	
	var srcDate = $("#src_date").datebox('getTheDate');
	var srcTime = $("#src_time").datebox('getTheDate');
	
	var tzDate = new timezoneJS.Date(srcDate.getFullYear(), srcDate.getMonth(), srcDate.getDate(), srcTime.getHours(), srcTime.getMinutes(), 0, 0, srcZone);
	tzDate.setTimezone(dstZone);
	
	var dstDate = new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate(), tzDate.getHours(), tzDate.getMinutes(), 0, 0);
	
	$("#dst_date").datebox('setTheDate', dstDate);
	$("#dst_date").trigger('datebox', {'method' : 'doset'});
	$("#dst_time").datebox('setTheDate', dstDate);
	$("#dst_time").trigger('datebox', {'method' : 'doset'});
	
	$("#dst_date_text").text($("#dst_date").val());
	$("#dst_time_text").text($("#dst_time").val());
}

/*
 * Event
 */

function change_srcCountry()
{
	var srcCountry = $("#src_country").val();
	
	setCookie('src_country', srcCountry);
	
	clearCitySelect('#src_city');
	
	if(srcCountry == "")
	{
		$("#src_city").selectmenu('disable');
	}
	else
	{
		var firstValue = setCitySelect('#src_city', srcCountry);
		
		$('#src_city').val(firstValue);
		
		$("#src_city").selectmenu('enable');
	}
	
	$("#src_city").selectmenu('refresh', true);
	
	change_srcCity();
}

function change_dstCountry()
{
	var dstCountry = $("#dst_country").val();
	
	setCookie('dst_country', dstCountry);
	
	clearCitySelect('#dst_city');
	
	if(dstCountry == "")
	{
		$("#dst_city").selectmenu('disable');
	}
	else
	{
		var firstValue = setCitySelect('#dst_city', dstCountry);
		
		$('#dst_city').val(firstValue);
		
		$("#dst_city").selectmenu('enable');
	}
	
	$("#dst_city").selectmenu('refresh', true);
	
	change_dstCity();
}

function change_srcCity()
{
	var srcZone = $("#src_city").val();
	
	setCookie('src_zone', srcZone);
	
	var srcDateVal = $("#src_date").val();
	var srcTimeVal = $("#src_time").val();
	
	if(((srcDateVal == undefined) || (srcDateVal == "")) && ((srcTimeVal == undefined) || (srcTimeVal == "")))
	{
		setSrcCurrentDateTime();
	}
	
	translateTimeZone();
}

function change_dstCity()
{
	var dstZone = $("#dst_city").val();
	
	setCookie('dst_zone', dstZone);
	
	translateTimeZone();
}

function change_srcDate()
{
	translateTimeZone();
}

function change_srcTime()
{
	translateTimeZone();
}

function change_language()
{
	var selectLang = $("#language").val();
	if(selectLang != language)
	{
		setCookie('language', selectLang);
		
		location.replace("./");
	}
}

function push_setCurrentTime()
{
	setSrcCurrentDateTime();
}

$(document).ready(initialize('cookie'));
