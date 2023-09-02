from itertools import combinations

def generate_subsets(objects, max_size=3):
    subsets = []
    for r in range(1, max_size + 1):
        subsets.extend(combinations(objects, r))
    return subsets


def main():
    objects = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9", "box10"]
    subsets = generate_subsets(objects)
    for subset in subsets:
        print(subset)

if __name__ == "__main__":
    main()