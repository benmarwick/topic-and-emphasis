# Record what quanteda.textstats gives for the fixed test passages.
#
# Run once, from the repository root:
#   install.packages(c("quanteda", "quanteda.textstats", "jsonlite"))
#   Rscript tests/readability/reference.R
# It writes tests/readability/reference-quanteda.json. Commit that file.
# `node tests/readability.test.js` then prints this page's figures beside it.
library(quanteda)
library(quanteda.textstats)
library(jsonlite)

files <- sort(list.files("tests/readability/texts", pattern = "\\.txt$", full.names = TRUE))
txt <- vapply(files, function(f) paste(readLines(f, encoding = "UTF-8", warn = FALSE), collapse = " "), "")
names(txt) <- basename(files)
r <- textstat_readability(corpus(txt), measure = c("Flesch", "Flesch.Kincaid", "ARI", "SMOG", "Coleman.Liau.short", "FOG", "LIW", "Dale.Chall.old"))
texts <- lapply(seq_len(nrow(r)), function(i) list(
  fre = r$Flesch[i], fk = r$Flesch.Kincaid[i], ari = r$ARI[i], smog = r$SMOG[i],
  cl = r$Coleman.Liau.short[i], fog = r$FOG[i], lix = r$LIW[i], dale = r$Dale.Chall.old[i]))
names(texts) <- r$document
out <- list(tool = "quanteda.textstats", version = as.character(packageVersion("quanteda.textstats")), texts = texts)
write_json(out, "tests/readability/reference-quanteda.json", auto_unbox = TRUE, digits = 6, pretty = TRUE)
cat("wrote reference-quanteda.json for", length(texts), "texts\n")
