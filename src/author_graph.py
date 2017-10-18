from models.Data import Data
import itertools
from sklearn.cluster import dbscan
from sklearn.preprocessing import StandardScaler
from networkx.algorithms import all_pairs_dijkstra_path_length
import networkx as nx


class authorgraph:
    edges = dict()
    paths = dict()


    def load(self):
        for key, paper in Data.papers.items():
            for pair in itertools.product(paper.authors, repeat=2):
                if pair[0] not in self.edges:
                    self.edges[pair[0]] = dict()
                if pair[1] not in self.edges[pair[0]]:
                    self.edges[pair[0]][pair[1]] = 0
                self.edges[pair[0]][pair[1]] += 1 #paper.influence
        self.graph()
    #    print(self.paths)
    #    self.cluster(self.path)

    def graph(self):
        G = nx.Graph(self.edges)
        self.path = all_pairs_dijkstra_path_length(G)
        #for i in self.path:
            #print(i)


    # def cluster(self, path):
    #     SS = StandardScaler()
    #     X = SS.fit_transform(self.path)
    #     db = dbscan().fit(X)
    #     labels = db.labels_
    #     n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)
    #     print('Estimated number of clusters: %d' % n_clusters_)