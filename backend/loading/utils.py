from py3dbp import Packer, Bin, Item
from itertools import combinations


def _volume(width, height, length):
    return float(width) * float(height) * float(length)

def optimize_loading_one_truck(cargos, trucks):
    packer = Packer()

    cargo_volume = 0
    cargo_weight = 0
    for cargo in cargos:
        cargo_volume += _volume(cargo.width, cargo.height, cargo.length)
        cargo_weight += cargo.weight
        packer.add_item(Item(str(cargo.id), cargo.width, cargo.height, cargo.length, cargo.weight))
    # Initialize objects
    for truck in trucks:
        truck_volume = _volume(truck.width, truck.height, truck.length)
        valid = truck.max_weight >= cargo_weight and truck_volume >= cargo_volume
        if valid:
            packer.add_bin(Bin(truck.truck_type, truck.width, truck.height, truck.length, truck.max_weight))
    
    # Pack the items into the bins
    optimal_bin = None
    optimal_bin_volume = None
    packer.pack(bigger_first=True, distribute_items=False)
    
    for bin in packer.bins:
        if not(bin.unfitted_items):
            bin_volume = _volume(bin.width, bin.height, bin.depth)
            if optimal_bin_volume==None or bin_volume < optimal_bin_volume:
                optimal_bin_volume = bin_volume
                optimal_bin = bin
    return optimal_bin

def _generate_subsets(objects, max_size=2):
    subsets = []
    for r in range(1, max_size + 1):
        subsets.extend(combinations(objects, r))
    return subsets

def _cargo_volume_weight(cargos):
    cargo_volume = 0
    cargo_weight = 0
    for cargo in cargos:
        cargo_volume += _volume(cargo.width, cargo.height, cargo.length)
        cargo_weight += cargo.weight
    return (cargo_volume, cargo_weight)

def _truck_subset_volume_weight(trucks):
    trucks_volume = 0
    trucks_weight = 0
    for truck in trucks:
        trucks_volume += _volume(truck.width, truck.height, truck.length)
        trucks_weight += truck.max_weight
    return (trucks_volume, trucks_weight)

def _validate_truck_subsets(cargos, trucks):
    cargo_volume, cargo_weight = _cargo_volume_weight(cargos)
    truck_subsets = _generate_subsets(trucks)
    valid_subsets = []
    for subset in truck_subsets:
        trucks_volume, trucks_weight = _truck_subset_volume_weight(subset)

        if trucks_volume >= cargo_volume and trucks_weight >= cargo_weight:
            valid_subsets += (subset,)
    return valid_subsets

def _count_items_in_lists(lists):
    item_counts = {}

    for lst in lists:
        for item in lst:
            if item in item_counts:
                item_counts[item] += 1
            else:
                item_counts[item] = 1

    return item_counts

def _valid_solution( packer)->bool:
    return not(len(packer.items))

def _load_subset(cargos, trucks):
    packer = Packer()

    for cargo in cargos:
        packer.add_item(Item(str(cargo.id), cargo.width, cargo.height, cargo.length, cargo.weight))

    # Initialize objects
    for truck in trucks:
        packer.add_bin(Bin(truck.truck_type, truck.width, truck.height, truck.length, truck.max_weight))
    
    # Pack the items into the bins
    packer.pack(bigger_first=True, distribute_items=True)
    return packer

def _truck_subst_volume(trucks_subset):
    volume = 0
    for truck in trucks_subset:
        volume += _volume(truck.width, truck.height, truck.length)
    return volume

def optimize_loading_trucks(cargos, trucks):
    valid_subsets = _validate_truck_subsets(cargos, trucks)
    
    optimal_truck_subset_volume = None
    optimal_truck_subset_packer = None
    for subset in valid_subsets:
        packer = _load_subset(cargos, subset)
        if _valid_solution(packer):
            truck_subset_volume = _truck_subst_volume(subset)
            if optimal_truck_subset_volume==None or truck_subset_volume < optimal_truck_subset_volume:
                optimal_truck_subset_volume = truck_subset_volume
                optimal_truck_subset_packer = packer
    return(optimal_truck_subset_packer)

def optimize_loading_one(cargos, trucks):
    bin = optimize_loading_one_truck(cargos, trucks)

    truck = {
        "id" : bin.name,
        "size": (bin.width, bin.height, bin.depth)
    }
    items_in_truck = [
        {
            "cargo_id": int(item.name),
            "position": (item.position[0], item.position[1], item.position[2]),
            "size": (item.width, item.height, item.depth)
        }
        for item in bin.items
    ]

    return ({
        "solution": [
            {
                "truck": truck, 
                "items": items_in_truck
            }
        ]
    })

def optimize_loading_many(cargos, trucks):
    packer = optimize_loading_trucks(cargos, trucks)
    solution = []

    for bin in packer.bins:
        truck = {
            "id" : bin.name,
            "size": (bin.width, bin.height, bin.depth)
        }
        items_in_truck = [
            {
                "cargo_id": int(item.name),
                "position": (item.position[0], item.position[1], item.position[2]),
                "size": (item.width, item.height, item.depth)
            }
            for item in bin.items
        ]
        solution += [{
                "truck": truck, 
                "items": items_in_truck
            }]

    return {"solution": solution}

def optimize_loading(cargos, trucks):
    return optimize_loading_many(cargos, trucks)
    