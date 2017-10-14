# calculate the LM score per query term
def GetScoreLM(collect_fr, doc_fr, doc_len,collect_len, lamba_value = 0.9):
    score = lamba_value*(doc_fr/doc_len) + ((1-lamba_value)*(collect_fr/collect_len))
    return score
