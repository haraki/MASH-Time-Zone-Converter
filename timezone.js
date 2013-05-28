var countryData;
var timezoneData;
var i18nDir = "./i18n/";
var tzDataDir = "./tz/";
var language = "en";

function initialize(mode)
{
	switch(mode)
	{
	case 'cookie':
		{
			var languageCookie = $.cookie("language");
			if((languageCookie != undefined) && (languageCookie != ""))
			{
				language = languageCookie;
			}
		
			initialize('properties');
		}
		
		break;
		
	case 'properties':
		$.i18n.properties({name:'Messages', path:i18nDir, mode:'both', language:language, callback:function(){ initialize('prepering'); }});
		
		break;
		
	case 'prepering':
		$("title").text(TITLE);
		$("#msg_initializing").text(INITIALIZING);
		
		initialize('datebox');
		
		break;
		
	case 'datebox':
		$.getScript(DATEBOX_FILE, function(data, status){ initializeDateBox(); initialize('country_json'); });
		
		break;
		
	case 'country_json':
		$.getJSON(COUNTRY_JSON_FILE, function(ctData, status){ countryData = ctData; initialize('timezone_json'); });
		
		break;
		
	case 'timezone_json':
		$.getJSON(TIMEZONE_JSON_FILE, function(tzData, status){ timezoneData = tzData; initialize('timezone'); });
		
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

function  initializeDateBox()
{
	$("#src_date").data('datebox').options.overrideSetDateButtonLabel     = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setDateButtonLabel;
	$("#src_date").data('datebox').options.overrideSetTimeButtonLabel     = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setTimeButtonLabel;
	$("#src_date").data('datebox').options.overrideSetDurationButtonLabel = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setDurationButtonLabel;
	$("#src_date").data('datebox').options.overrideCalTodayButtonLabel    = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].calTodayButtonLabel;
	$("#src_date").data('datebox').options.overrideTitleDateDialogLabel   = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].titleDateDialogLabel;
	$("#src_date").data('datebox').options.overrideTitleTimeDialogLabel   = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].titleTimeDialogLabel;
	$("#src_date").data('datebox').options.overrideDaysOfWeek             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].daysOfWeek;
	$("#src_date").data('datebox').options.overrideDaysOfWeekShort        = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].daysOfWeekShort;
	$("#src_date").data('datebox').options.overrideMonthsOfYear           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].monthsOfYear;
	$("#src_date").data('datebox').options.overrideMonthsOfYearShort      = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].monthsOfYearShort;
	$("#src_date").data('datebox').options.overrideDurationLabel          = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].durationLabel;
	$("#src_date").data('datebox').options.overrideDurationDays           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].durationDays;
	$("#src_date").data('datebox').options.overrideTooltip                = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].tooltip;
	$("#src_date").data('datebox').options.overrideNextMonth              = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].nextMonth;
	$("#src_date").data('datebox').options.overridePrevMonth              = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].prevMonth;
	$("#src_date").data('datebox').options.overrideTimeFormat             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].timeFormat;
	$("#src_date").data('datebox').options.overrideHeaderFormat           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].headerFormat;
	$("#src_date").data('datebox').options.overrideDateFieldOrder         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].dateFieldOrder;
	$("#src_date").data('datebox').options.overrideTimeFieldOrder         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].timeFieldOrder;
	$("#src_date").data('datebox').options.overrideSlideFieldOrder        = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].slideFieldOrder;
	$("#src_date").data('datebox').options.overrideDateFormat             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].dateFormat;
	$("#src_date").data('datebox').options.overrideUseArabicIndic         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].useArabicIndic;
	$("#src_date").data('datebox').options.overrideIsRTL                  = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].isRTL;
	$("#src_date").data('datebox').options.overrideCalStartDay            = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].calStartDay;
	$("#src_date").data('datebox').options.overrideClearButton            = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].clearButton;
	
	$("#src_time").data('datebox').options.overrideSetDateButtonLabel     = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setDateButtonLabel;
	$("#src_time").data('datebox').options.overrideSetTimeButtonLabel     = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setTimeButtonLabel;
	$("#src_time").data('datebox').options.overrideSetDurationButtonLabel = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].setDurationButtonLabel;
	$("#src_time").data('datebox').options.overrideCalTodayButtonLabel    = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].calTodayButtonLabel;
	$("#src_time").data('datebox').options.overrideTitleDateDialogLabel   = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].titleDateDialogLabel;
	$("#src_time").data('datebox').options.overrideTitleTimeDialogLabel   = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].titleTimeDialogLabel;
	$("#src_time").data('datebox').options.overrideDaysOfWeek             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].daysOfWeek;
	$("#src_time").data('datebox').options.overrideDaysOfWeekShort        = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].daysOfWeekShort;
	$("#src_time").data('datebox').options.overrideMonthsOfYear           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].monthsOfYear;
	$("#src_time").data('datebox').options.overrideMonthsOfYearShort      = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].monthsOfYearShort;
	$("#src_time").data('datebox').options.overrideDurationLabel          = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].durationLabel;
	$("#src_time").data('datebox').options.overrideDurationDays           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].durationDays;
	$("#src_time").data('datebox').options.overrideTooltip                = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].tooltip;
	$("#src_time").data('datebox').options.overrideNextMonth              = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].nextMonth;
	$("#src_time").data('datebox').options.overridePrevMonth              = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].prevMonth;
	$("#src_time").data('datebox').options.overrideTimeFormat             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].timeFormat;
	$("#src_time").data('datebox').options.overrideHeaderFormat           = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].headerFormat;
	$("#src_time").data('datebox').options.overrideDateFieldOrder         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].dateFieldOrder;
	$("#src_time").data('datebox').options.overrideTimeFieldOrder         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].timeFieldOrder;
	$("#src_time").data('datebox').options.overrideSlideFieldOrder        = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].slideFieldOrder;
	$("#src_time").data('datebox').options.overrideDateFormat             = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].dateFormat;
	$("#src_time").data('datebox').options.overrideUseArabicIndic         = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].useArabicIndic;
	$("#src_time").data('datebox').options.overrideIsRTL                  = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].isRTL;
	$("#src_time").data('datebox').options.overrideCalStartDay            = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].calStartDay;
	$("#src_time").data('datebox').options.overrideClearButton            = $.mobile.datebox.prototype.options.lang[DATEBOX_LANG].clearButton;
}

function initializePage()
{
	$("#msg_title_body").text(TITLE);
	$("#msg_from").text(FROM);
	$("#msg_to").text(TO);
	$("#msg_sel_country_src").text(SELECT_COUNTRY);
	$("#msg_sel_country_dst").text(SELECT_COUNTRY);
	$("#msg_sel_city_src").text(SELECT_CITY);
	$("#msg_sel_city_dst").text(SELECT_CITY);
	
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
	
	var srcZone = $("#src_city").val();
	if((srcZone != undefined) && (srcZone != ""))
	{
		var tzDate = new timezoneJS.Date();
		tzDate.setTimezone(srcZone);
		
		var srcDate = new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate(), tzDate.getHours(), tzDate.getMinutes(), 0, 0);
		
		$("#src_date").datebox('setTheDate', srcDate);
		$("#src_date").trigger('datebox', {'method' : 'doset'});
		$("#src_time").datebox('setTheDate', srcDate);
		$("#src_time").trigger('datebox', {'method' : 'doset'});
	}
	
	translateTimeZone();
	
	$("#language").val(language);
	
	$("#initialize").hide();
	$("#main").show();
}

function checkCookie(countryCookieName, countrySelectId, zoneCookieName, citySelectId)
{
	var countryCookie = $.cookie(countryCookieName);
	if((countryCookie != undefined) && (countryCookie != ""))
	{
		$(countrySelectId).val(countryCookie);
		
		var firstValue = setCitySelect(citySelectId, countryCookie);
		
		var zoneCookie = $.cookie(zoneCookieName);
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

function change_srcCountry()
{
	var srcCountry = $("#src_country").val();
	
	$.cookie('src_country', srcCountry);
	
	clearCitySelect('#src_city');
	
	if(srcCountry == "")
	{
		$("#src_city").selectmenu('disable');
	}
	else
	{
		var firstValue = setCitySelect('#src_city', srcCountry);
		
		$('#src_city').val(firstValue);
		
		$.cookie('src_zone', firstValue);
		
		$("#src_city").selectmenu('enable');
	}
	
	$("#src_city").selectmenu('refresh', true);
	
	translateTimeZone();
}

function change_dstCountry()
{
	var dstCountry = $("#dst_country").val();
	
	$.cookie('dst_country', dstCountry);
	
	clearCitySelect('#dst_city');
	
	if(dstCountry == "")
	{
		$("#dst_city").selectmenu('disable');
	}
	else
	{
		var firstValue = setCitySelect('#dst_city', dstCountry);
		
		$('#dst_city').val(firstValue);
		
		$.cookie('dst_zone', firstValue);
		
		$("#dst_city").selectmenu('enable');
	}
	
	$("#dst_city").selectmenu('refresh', true);
	
	translateTimeZone();
}

function change_srcCity()
{
	var srcZone = $("#src_city").val();
	
	$.cookie('src_zone', srcZone);
	
	translateTimeZone();
}

function change_dstCity()
{
	var dstZone = $("#dst_city").val();
	
	$.cookie('dst_zone', dstZone);
	
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

function click_optionOk()
{
	var lang = $("#language").val();
	if(lang != language)
	{
		$.cookie('language', lang);
	
		location.replace("./");
	}
}

$(document).ready(initialize('cookie'));
