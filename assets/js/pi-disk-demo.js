(function () {
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function numberInput(root, name) {
    return root.querySelector('[name="' + name + '"]');
  }

  function readParams(root) {
    var L = clamp(Number(numberInput(root, "L").value) || 100, 1, 120);
    var D = clamp(Number(numberInput(root, "D").value) || 80, 1, L);
    var d = clamp(Number(numberInput(root, "d").value) || 0, 0, D - 0.001);
    var n = clamp(Math.round(Number(numberInput(root, "n").value) || 160), 1, 2000);
    var trials = clamp(Math.round(Number(numberInput(root, "trials").value) || 250), 1, 10000);

    numberInput(root, "L").value = L;
    numberInput(root, "D").value = D;
    numberInput(root, "d").value = Math.round(d * 1000) / 1000;
    numberInput(root, "n").value = n;
    numberInput(root, "trials").value = trials;

    return { L: L, D: D, d: d, n: n, trials: trials };
  }

  function simulate(params) {
    var effectiveRadius = (params.D - params.d) / 2;
    var circleRadius = params.D / 2;
    var center = params.L / 2;
    var areaFactor = (params.L * params.L) / (effectiveRadius * effectiveRadius);
    var total = params.n * params.trials;
    var counted = 0;
    var lastTrial = [];
    var series = [];

    for (var trial = 0; trial < params.trials; trial += 1) {
      var trialDisks = [];
      for (var i = 0; i < params.n; i += 1) {
        var x = Math.random() * params.L;
        var y = Math.random() * params.L;
        var dx = x - center;
        var dy = y - center;
        var hit = Math.sqrt(dx * dx + dy * dy) <= effectiveRadius;
        if (hit) counted += 1;
        if (trial === params.trials - 1) trialDisks.push({ x: x, y: y, hit: hit });
      }
      series.push((counted / ((trial + 1) * params.n)) * areaFactor);
      if (trial === params.trials - 1) lastTrial = trialDisks;
    }

    return {
      counted: counted,
      total: total,
      estimate: (counted / total) * areaFactor,
      circleRadius: circleRadius,
      effectiveRadius: effectiveRadius,
      disks: lastTrial,
      series: series
    };
  }

  function draw(root, params, result) {
    var canvas = root.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var size = canvas.width;
    var pad = 28;
    var scale = (size - 2 * pad) / params.L;
    var center = pad + (params.L / 2) * scale;
    var diskRadius = (params.d / 2) * scale;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#fbfdff";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#f3f8fc";
    ctx.strokeStyle = "rgba(44, 58, 68, 0.3)";
    ctx.lineWidth = 1.6;
    ctx.fillRect(pad, pad, params.L * scale, params.L * scale);
    ctx.strokeRect(pad, pad, params.L * scale, params.L * scale);

    ctx.beginPath();
    ctx.arc(center, center, result.circleRadius * scale, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(91, 126, 146, 0.06)";
    ctx.fill();
    ctx.strokeStyle = "#607786";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, result.effectiveRadius * scale, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(88, 113, 128, 0.34)";
    ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    result.disks.forEach(function (disk) {
      ctx.beginPath();
      ctx.arc(pad + disk.x * scale, pad + disk.y * scale, Math.max(diskRadius, 1.8), 0, Math.PI * 2);
      ctx.fillStyle = disk.hit ? "rgba(55, 118, 146, 0.58)" : "rgba(43, 54, 61, 0.18)";
      ctx.fill();
    });
  }

  function drawConvergence(root, result) {
    var canvas = root.querySelector("[data-convergence]");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    var padL = 30, padR = 10, padT = 12, padB = 22;
    var pw = W - padL - padR, ph = H - padT - padB;
    var series = result.series, n = series.length;

    var lo = Math.PI, hi = Math.PI;
    series.forEach(function (v) { if (v < lo) lo = v; if (v > hi) hi = v; });
    var mid = (lo + hi) / 2, half = Math.max((hi - lo) / 2, 0.15) * 1.15;
    lo = mid - half; hi = mid + half;

    var px = function (i) { return padL + (n <= 1 ? pw / 2 : (i / (n - 1)) * pw); };
    var py = function (v) { return padT + ph - ((v - lo) / (hi - lo)) * ph; };

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fbfdff";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(44, 58, 68, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + ph);
    ctx.lineTo(padL + pw, padT + ph);
    ctx.stroke();

    var piY = py(Math.PI);
    ctx.strokeStyle = "rgba(44, 58, 68, 0.42)";
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, piY);
    ctx.lineTo(padL + pw, piY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#26333a";
    ctx.font = "12px Georgia, serif";
    ctx.textAlign = "right";
    ctx.fillText("π", padL - 5, piY + 4);

    ctx.strokeStyle = "#3a7288";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    series.forEach(function (v, i) {
      var x = px(i), y = py(v);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = "#52626c";
    ctx.font = "11px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("trial", padL + pw / 2, H - 5);
    ctx.save();
    ctx.translate(10, padT + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("estimate", 0, 0);
    ctx.restore();
  }

  function renderStats(root, result) {
    root.querySelector("[data-estimate]").textContent = result.estimate.toFixed(6);
    root.querySelector("[data-error]").textContent = Math.abs(Math.PI - result.estimate).toFixed(6);
    root.querySelector("[data-counted]").textContent = result.counted.toLocaleString();
    root.querySelector("[data-total]").textContent = result.total.toLocaleString();
  }

  function run(root) {
    var params = readParams(root);
    var result = simulate(params);
    draw(root, params, result);
    renderStats(root, result);
    drawConvergence(root, result);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-pi-disk-demo]").forEach(function (root) {
      root.querySelector("[data-run]").addEventListener("click", function () { run(root); });
      root.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("change", function () { run(root); });
      });
      run(root);
    });
  });
})();
