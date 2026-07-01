---
title: "Crystal-Structure Classification from MD Self-Assembled Crystals"
excerpt: "A method for identifying crystalline phases and grains directly from molecular dynamics trajectories."
date: 2026-06-01
author: "George Padilla"
featured: true
draft: false
layout: single
links:
- icon: github
  icon_pack: fab
  name: code
  url: https://github.com/gpadill5
---

Work in progress. The code and a write-up will be on [GitHub](https://github.com/gpadill5) soon.

This finds and classifies crystal structures in molecular dynamics simulations. For each snapshot it locates the repeating unit cells, splits the system into individual grains, and works out what structure each grain is. It doesn't need a library of known crystals to compare against.

{{< figure src="crystals_panel.png" alt="Five crystal structures found in MD, each labeled and shown along the direction where its repeating pattern is clearest" caption="Structures the method found in MD, each shown along the direction where its repeating pattern is clearest. They range from simple close packing (hP2 / HCP) and the A15 phase (cP8, Pm-3n) to the complex Frank–Kasper phases cF144, cF160, and cI16." >}}

Simple structures like HCP are easy to spot. The hard ones are the big Frank–Kasper phases such as cF144, cF160, and cI16, where a single repeating unit can span hundreds of particles and a real grain is usually noisy. Those are the cases I care most about.

More soon.
