---
title: "Estimating Pi by Dropping Disks"
description: "A small Monte Carlo demo: scatter disks on a platform and estimate pi from how many fit inside a larger circle."
date: 2026-06-26
author: "George Padilla"
show_author_byline: false
show_post_date: true
show_post_thumbnail: false
layout: single
summary_image: "/img/pi-disk-drop-example.png"
---

This is a Monte Carlo estimate of `pi`: scatter disks at random on an `L x L` platform, repeat for `n_t` trials, and count how many land fully inside a circle of diameter `D`.

A disk of diameter `d` fits inside only when its center stays at least one radius (`d/2`) away from the circle's edge, so the effective target is the smaller circle of radius `(D - d) / 2`. The hit fraction gives:

`pi ≈ hit_fraction * L² / ((D - d) / 2)²`

Set `d = 0` and this is the classical method of estimating `pi` through "throwing darts"!

<div class="pi-disk-demo" data-pi-disk-demo>
  <div class="pi-disk-controls" aria-label="Pi disk simulation controls">
    <label>
      <span>n</span>
      <input type="number" name="n" min="1" max="2000" step="1" value="160">
    </label>
    <label>
      <span>d</span>
      <input type="number" name="d" min="0" max="99" step="1" value="6">
    </label>
    <label>
      <span>D</span>
      <input type="number" name="D" min="1" max="100" step="1" value="80">
    </label>
    <label>
      <span>L</span>
      <input type="number" name="L" min="1" max="120" step="1" value="100">
    </label>
    <label>
      <span>n_t</span>
      <input type="number" name="trials" min="1" max="10000" step="1" value="250">
    </label>
    <button type="button" data-run>Sample</button>
  </div>

  <div class="pi-disk-output">
    <canvas width="640" height="640" aria-label="Disk drop simulation"></canvas>
    <div class="pi-disk-stats" aria-live="polite">
      <p><strong>estimate</strong><span data-estimate>--</span></p>
      <p><strong>error</strong><span data-error>--</span></p>
      <p><strong>inside</strong><span data-counted>--</span></p>
      <p><strong>draws</strong><span data-total>--</span></p>
      <canvas class="pi-disk-convergence" width="360" height="240" data-convergence aria-label="Pi estimate versus number of trials"></canvas>
    </div>
  </div>
</div>

The little plot on the right shows the convergence of the estimated pi value to actual pi over `n_t` trials. Play with the parameters to improve (or worsen) its convergence.

[Code for this demo.](/js/pi-disk-demo.js)
