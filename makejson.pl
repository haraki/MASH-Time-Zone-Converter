#!/usr/bin/perl

my $iso3166_tab_file = "tz/iso3166.tab";
my $zone_tab_file = "tz/zone.tab";
my $json_file = "timezone.json";

# read 'iso3166.tab'
if(!open(FILE, $iso3166_tab_file))
{
	print $iso3166_tab_file . " open error.\n";
	exit(-1);
}

my @iso3166_tab_list = <FILE>;

close(FILE);

# parse 'iso3166.tab'
my %country_list;
foreach my $iso3166_tab_str (@iso3166_tab_list)
{
	if($iso3166_tab_str !~ /#/)
	{
		chomp($iso3166_tab_str);
		my @iso3166_tab = split(/\t/, $iso3166_tab_str);
		$country_list{$iso3166_tab[0]} = $iso3166_tab[1];			# key = country code, param = country name
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
if(!open(OUT_FILE, ">$json_file"))
{
	print $json_file . " open error.\n";
	exit(-1);
}

my $first = 1;
print OUT_FILE "[\n";
for(my $i = 0;$i < @zone_tz_list;$i++)
{
	if($i > 0)
	{
		print OUT_FILE ",\n";
	}
	
	my $zone_tz_str = $zone_tz_list[$i];
	my @zone_tz = split(/\//, $zone_tz_str);
	my $zone_city = pop(@zone_tz);
	my $zone_country = $country_list{$zone_cc_list[$i]};
	
	print OUT_FILE "\t{ \"tz\":\"$zone_tz_str\", \"city\":\"$zone_city\", \"country\":\"$zone_country\" }";
}
print OUT_FILE "\n]\n";

close(OUT_FILE);
