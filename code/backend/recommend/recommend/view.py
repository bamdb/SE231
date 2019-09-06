from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json
from tensorflow.keras.models import model_from_json
import numpy as np


@csrf_exempt
@require_POST
def api(request):
    body = json.loads(request.body.decode())
    itemids = body.get('itemids')
    item2id = json.load(open('./recommend/planb-item2id.json', 'r'))
    ids = [item2id.get(str(id)) for id in itemids]
    # input is a one-hot array whose input[id]=1
    input = np.zeros((1, 5180))
    for id in ids:
        if id is not None:
            input[0][id] = 1
    model = model_from_json(open('./recommend/model1.json').read())
    model.load_weights('./recommend/weight1.h5', by_name=True)
    #  output is the possibility of each id whose shape is (,5180)
    output = np.argsort(model.predict(input))
    id2item = json.load(open('./recommend/planb-id2item.json', 'r'))
    #  change the id into itemid
    # print(id2item[str(output[0][0])])
    output = output[0][0:5]
    its = [id2item[str(id)] for id in output]
    return JsonResponse(data=its, safe=False)
