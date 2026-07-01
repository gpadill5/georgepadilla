---
title: "Computational Modeling of Active Fluids"
subtitle: "Manuscript coming soon! — 07/2026"
excerpt: "M.S. thesis: molecular dynamics of active Lennard-Jones fluids, with unsupervised machine learning to classify the phases that emerge."
date: 2025-08-01
author: "George Padilla"
featured: true
draft: false
layout: single
---

For my M.S. thesis at Cornell, I built HOOMD-blue molecular dynamics simulations of Lennard-Jones binary fluids that undergo liquid–liquid phase separation, with a Monte Carlo protocol that lets particles interconvert between two species (A ⇌ B). This interconversion continuously injects energy and drives the fluid out of equilibrium — an *active* liquid.

To characterize the structures that emerge, I engineered per-particle features (coordination and neighbor numbers, Voronoi volumes) and used **unsupervised machine learning** — Gaussian mixture model clustering with t-SNE embeddings — to automatically separate coexisting phases across large parameter sweeps, rather than labeling them by hand.

<figure class="video-single">
  <video src="/videos/passive_droplet_full.mp4" autoplay loop muted playsinline controls></video>
  <figcaption>The full two-phase system: a disperse phase (blue) droplet suspended in the continuous phase (red). The clustering pipeline assigns every particle to one of these coexisting phases automatically.</figcaption>
</figure>

**The switching protocol**

Each particle morphs between species A and B through `N = 10` sub-steps indexed by a progress variable `p`, smoothly interpolating its pair potential from the A form to the B form. A switch probability `P_switch` sets how often particles attempt to convert; under unbiased switching the A and B populations stay balanced near 50%.

{{< figure src="switching.png" alt="Schematic of P_switch-controlled A to B interconversion, interpolated pair potentials, and the balanced particle fractions over time" caption="Particles interconvert between species A and B in 10 sub-steps (a), smoothly morphing the pair potential from A (gray) to B (pink) (b). Under unbiased switching the two populations stay balanced near 50% (c)." >}}

**Switching restructures the droplet**

Even at constant temperature, turning on interconversion reshuffles which particles belong to the dense phase, so a droplet that looks equilibrated keeps reorganizing at steady state.

<!-- TODO: add the "Steady state switching (Const. T)" before/after droplet screenshot here as restructuring.png -->

**Active vs. passive droplets**

The two videos below show only the **disperse phase (blue)** — the continuous phase (red) from the video above is deleted so the droplet structure is visible. Without switching, the system relaxes into a single, stable equilibrium droplet (passive). Turn interconversion on and the droplet never settles (active): activity keeps it pinching off smaller droplets and continually restructuring.

<div class="video-row">
  <figure>
    <video src="/videos/passive_droplet.mp4" autoplay loop muted playsinline controls></video>
    <figcaption>Passive: a single stable droplet at equilibrium.</figcaption>
  </figure>
  <figure>
    <video src="/videos/active_droplet.mp4" autoplay loop muted playsinline controls></video>
    <figcaption>Active: switching drives continual pinch-off and restructuring.</figcaption>
  </figure>
</div>

**Emergent structures**

Activity opens up liquid phenomena that the passive system never reaches — droplets pinching off into smaller droplets, and, at higher activity, arrested **bicontinuous** structures where interpenetrating A-rich and B-rich domains span the box instead of separating into discrete droplets.

{{< figure src="bicontinuous.png" alt="A 3D bicontinuous network of A-rich (blue) and B-rich (red) phases" caption="A representative bicontinuous state: A-rich (blue) and B-rich (red) phases interpenetrate, with particles of the same phase linked when within the mean nearest-neighbor distance." >}}

More information to come. ⭐
