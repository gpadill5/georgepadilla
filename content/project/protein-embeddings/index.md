---
title: "IDR Evolution in Neurodegenerative Proteins"
excerpt: "A computational biology project analyzing intrinsically disordered regions in TDP-43, FUS, and Axin-1 across species."
date: 2024-12-21
author: "George Padilla"
featured: true
draft: false
layout: single
links:
- icon: github
  icon_pack: fab
  name: code
  url: https://github.com/gpadill5/BIOCB_6840_final
---

This project studied the evolution and function of intrinsically disordered regions (IDRs) in TDP-43, FUS, and Axin-1, proteins connected to neurodegenerative disease biology. I compared sequences from *Homo sapiens*, *Pan troglodytes*, *Mus musculus*, *Bos taurus*, and *Xenopus laevis* to identify conserved and divergent IDR patterns across evolutionary distances.

The workflow combined public protein databases, AlphaFold-disorder predictions, multiple sequence alignment, phylogenetic tree construction, ProtTrans residue embeddings, t-SNE visualization, DBSCAN clustering, and Eukaryotic Linear Motif (ELM) enrichment analysis.

[View the GitHub repository.](https://github.com/gpadill5/BIOCB_6840_final)  
[Open the full project report.](/files/6840_final_gp.pdf)

**What I Built**

- Predicted unannotated IDRs using AlphaFold-disorder relative solvent accessibility and 1-D Gaussian smoothing.
- Benchmarked smoothing parameters against known MobiDB/AlphaFold disorder annotations using Jaccard overlap.
- Built multiple sequence alignment visualizations that map ordered and disordered regions across species.
- Generated phylogenetic trees with Clustal Omega and Bio.Phylo to compare divergence across TDP-43, FUS, and Axin-1.
- Used ProtTrans embeddings with t-SNE and DBSCAN to cluster non-conserved IDR residues and connect clusters to ELM functional categories.

**Tools**

Python, Jupyter Notebook, AlphaFold-disorder, Clustal Omega, ProtTrans, HuggingFace/PyTorch tooling, scikit-learn, t-SNE, DBSCAN, Bio.Phylo, MobiDB, DisProt, UniProt, and ELM annotations.

**Selected Figures**

{{< figure src="tsne-embeddings.png" alt="t-SNE visualizations of residue-level ProtTrans embeddings for TDP-43, FUS, and Axin-1" caption="Residue-level ProtTrans embeddings were projected with t-SNE and grouped by ELM label enrichment to compare functional patterns across IDRs." >}}

{{< figure src="domain-maps.png" alt="Domain maps showing ordered and intrinsically disordered regions across TDP-43, FUS, and Axin-1 sequences" caption="Domain maps compare ordered and disordered regions across five species, mixing database annotations with AlphaFold-disorder-derived predictions." >}}

{{< figure src="phylogenetic-trees.png" alt="Phylogenetic trees for TDP-43, FUS, and Axin-1 across five species" caption="Phylogenetic trees were used to place IDR divergence in evolutionary context across mammals and Xenopus laevis." >}}

{{< figure src="elm-enrichment.png" alt="Grouped histograms showing ELM label enrichment across species and proteins" caption="ELM label-enriched clusters highlighted potential functional divergence in non-conserved IDR residues." >}}
