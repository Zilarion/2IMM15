import json

from models.Data import Data
import community
import itertools
import networkx as nx


class AuthorGraph:
    edges = dict()
    paths = dict()

    def load(self):
        # try:
        #     with open('author_graph.txt', 'r') as file:
        #         data = file.readlines()
        #         for line in data:
        #             line_data = dict(json.loads(line.rstrip()))
        #             if line_data["id"] < limit_id:
        #                 loaded_index[line_data["id"]] = line_data["inverted_index"]
        #         print("LOADING/READING")
        #         gensim_dict = get_gensim_dict()
        #         corpus = get_corpus()
        #
        # except FileNotFoundError:
        #     print("No author_graph file yet.. computing!")
        #     self.compute_graph()
        #
        # with open('author_graph.txt', 'a') as file:
        self.compute_graph()

    def compute_graph(self):
        count = 0
        for key, paper in Data.papers.items():
            for pair in itertools.product(paper.authors, repeat=2):
                if pair[0] not in self.edges:
                    self.edges[pair[0]] = dict()
                if pair[1] not in self.edges[pair[0]]:
                    self.edges[pair[0]][pair[1]] = 0
                self.edges[pair[0]][pair[1]] += 1  # paper.influence
                if pair[0] == pair[1]:
                    self.edges[pair[0]][pair[1]] = 0
                count += 1
                if count > 1000:
                    self.cluster_graph(self.edges)
                    return

    def cluster_graph(self, edges):
        G = nx.Graph()
        for source in edges:
            for target in edges[source]:
                weight = edges[source][target]
                G.add_edge(source, target, weight=weight)

        clusters = self.louvain_cluster(G)
        for cluster_id in clusters:
            for author_id in clusters[cluster_id]:
                Data.authors[author_id].cluster = cluster_id

    def louvain_cluster(self, G, minimum_cluster_size=5, plot_graph=False):
        if plot_graph:
            import matplotlib.pyplot as plt

        partition = community.best_partition(G, resolution=100)
        pos = nx.spring_layout(G)
        count = 0.
        colors = ['#377eb8', '#ff7f00', '#4daf4a',
                 '#f781bf', '#a65628', '#984ea3',
                 '#999999', '#e41a1c', '#dede00']

        clusters = dict()
        for com in set(partition.values()):
            count = count + 1.
            list_nodes = [nodes for nodes in partition.keys()
                          if partition[nodes] == com]
            if len(list_nodes) > minimum_cluster_size:
                if plot_graph:
                    nx.draw_networkx_nodes(G, pos, list_nodes, node_size=20, node_color=str(colors[com % 9]))
                clusters[com] = list_nodes

        print("With minimum ", minimum_cluster_size, ":", len(clusters))
        if plot_graph:
            plt.show()

        return clusters
