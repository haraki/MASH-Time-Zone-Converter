#!/usr/bin/perl

#
# MASH Time Zone Converter v1.0
# 
# https://bitbucket.org/haraki/mash-time-zone-converter
# 
# 
# The MIT License (MIT)
# 
# Copyright (c) 2013 Masashi Haraki (masa.haraki@gmail.com)
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

my $iso3166_tab_file = "tz/iso3166.tab";
my $zone_tab_file = "tz/zone.tab";
my $timezone_json_file = "timezone.json";
my $country_json_file = "country.json";

# read 'iso3166.tab'
if(!open(FILE, $iso3166_tab_file))
{
	print $iso3166_tab_file . " open error.\n";
	exit(-1);
}

my @iso3166_tab_list = <FILE>;

close(FILE);

# parse 'iso3166.tab'
my %country_hash;
foreach my $iso3166_tab_str (@iso3166_tab_list)
{
	if($iso3166_tab_str !~ /#/)
	{
		chomp($iso3166_tab_str);
		my @iso3166_tab = split(/\t/, $iso3166_tab_str);
		$country_hash{$iso3166_tab[0]} = $iso3166_tab[1];			# key = country code, param = country name
	}
}

# read 'zone.tab'
if(!open(FILE, $zone_tab_file))
{
	print $zone_tab_file . " open error.\n";
	exit(-1);
}

my @zone_tab_list = <FILE>;

close(FILE);

# parse 'zone.tab'
my @zone_cc_list;
my @zone_tz_list;
foreach my $zone_tab_str (@zone_tab_list)
{
	if($zone_tab_str !~ /#/)
	{
		chomp($zone_tab_str);
		my @zone_tab = split(/\t/, $zone_tab_str);
		push(@zone_cc_list, $zone_tab[0]);
		push(@zone_tz_list, $zone_tab[2]);
	}
}

# open 'timezone.json'
if(!open(TIMEZONE_OUT_FILE, ">$timezone_json_file"))
{
	print $timezone_json_file . " open error.\n";
	exit(-1);
}

print TIMEZONE_OUT_FILE "[\n";
for(my $i = 0;$i < @zone_tz_list;$i++)
{
	if($i > 0)
	{
		print TIMEZONE_OUT_FILE ",\n";
	}
	
	my $zone_tz_str = $zone_tz_list[$i];
	my @zone_tz = split(/\//, $zone_tz_str);
	my $zone_city = pop(@zone_tz);
	my $zone_country = $country_hash{$zone_cc_list[$i]};
	
	$zone_country =~ s/\s/_/g;
	$zone_country =~ s/\&/and/g;
	
	print TIMEZONE_OUT_FILE "\t{ \"tz\":\"$zone_tz_str\", \"country\":\"$zone_country\", \"city_name\":\"$zone_city\" }";
}
print TIMEZONE_OUT_FILE "\n]\n";

close(TIMEZONE_OUT_FILE);

# open 'country.json'
if(!open(COUNTRY_OUT_FILE, ">$country_json_file"))
{
	print $country_json_file . " open error.\n";
	exit(-1);
}

my @country_list = values(%country_hash);

print COUNTRY_OUT_FILE "[\n";
for(my $i = 0;$i < @country_list;$i++)
{
	if($i > 0)
	{
		print COUNTRY_OUT_FILE ",\n";
	}
	
	my $country_name = $country_list[$i];
	my $country      = $country_list[$i];
	
	$country =~ s/\s/_/g;
	$country =~ s/\&/and/g;
	print COUNTRY_OUT_FILE "\t{ \"country\":\"$country\", \"country_name\":\"$country_name\" }";
}

print COUNTRY_OUT_FILE "\n]\n";

close(COUNTRY_OUT_FILE);
