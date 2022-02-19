/*****************************************************************************
 * Copyright (c) 2020-2021 Sadret
 *
 * The OpenRCT2 plug-in "Soft Guest Cap Calculator" is licensed
 * under the GNU General Public License version 3.
 *****************************************************************************/

/// <reference path="./../../openrct2.d.ts" />

var changeColorOn = "None";// = context.sharedStorage.get("shirt-colordata.changeColorOn", "None");
var onSpawn = false;
var onDaily = false;

var datums = [ "None", "MaxIntensity", "MinIntensity", "happiness",];

var doDaily = function()
{
	if(!onDaily)
	{
		return;
	}
	if(changeColorOn == "None")
	{
		return;
	}
	map.getAllEntities("guest").forEach(function(guest)
	{
		//guest.tshirtColour = guest[changeColorOn];
		if(changeColorOn == "MaxIntensity")
		{
			guest.tshirtColour = guest.maxIntensity;
		}
	})
}

var doOnSpawn = function(info)
{
	if(!onSpawn)
	{
		return;
	}
    var guest = map.getEntity(info.id);
	if(changeColorOn == "None")
    {
        return;
    }
	//guest.tshirtColour = guest[changeColorOn];
    if(changeColorOn == "MaxIntensity")
    {
    	guest.tshirtColour = guest.maxIntensity;
	}
}

var handle = undefined;

var openWindow = function() {
	if (handle !== undefined)
		return;
	handle = ui.openWindow({
		classification: "invisibility thingy",
		width: 128,
		height: 92,
		title: "Guest Colorizer",
		onClose: function() {
			handle = undefined;
		},
		widgets: 
		[
			{
				type: "dropdown",
				text: "Data",
				items: datums,
				selectedIndex: 0,
				onChange: function(index)
				{
					changeColorOn = datums[index];
				},
				x: 5,
				y: 20,
				width: 118,
				height: 12,
			},
			{
				type: "checkbox",
				text: "Set on spawn",
				isChecked: false,
				onChange: function(isChecked) {
					onSpawn = isChecked;
				},
				x: 5,
				y: 40,
				width: 118,
				height: 12,
			},
			{
				type: "checkbox",
				text: "Set on daily",
				isChecked: false,
				onChange: function(isChecked) {
					onDaily = isChecked;
				},
				x: 5,
				y: 52,
				width: 118,
				height: 12,
			}
		],
	});
}

var main = function()
{
	ui.registerMenuItem("Guest Visualizer",openWindow);
	context.subscribe("guest.generation", doOnSpawn);
    context.subscribe("interval.day", doDaily);
}

registerPlugin({
	name: "idk yet",
	version: "0.0.1",
	authors: ["misspapaya"],
	type: "local",
	licence: "GPL-3.0",
	minApiVersion: 29,
	main: main,
});