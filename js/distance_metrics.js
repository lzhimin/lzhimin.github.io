
//minkowski family
function Minkowski(d1, d2, k){
    var sum     = 0,
        temp    = 0;

    for(var i =0, l = d1.length; i < l; i++){
        temp    =   Math.abs(d1[i] - d2[i]);
        sum     +=  Math.pow(temp, k);
    }
    return Math.pow(sum, 1.0/k);
}

//L1 family

//Inner Product family
function Cosine(d1, d2){
    var sum = 0,
        P   = 0,
        Q   = 0;

    for(var i = 0, l = d1.length; i < l; i++){
        P   += d1[i] * d1[i];
        Q   += d2[i] * d2[i];
        sum += d1[i] * d2[i];
    }
    p = Math.sqrt(P);
    Q = Math.sqrt(Q);
    return sum/(P * Q);
}

function Jaccard(d1, d2){
    var sum = 0,
        P   = 0,
        Q   = 0;

    for(var i = 0; i < d1.length; i++){
        sum += d1[i]*d2[i];
        P   += d1[i]*d1[i];
        Q   += d2[i]*d2[i];
    }
    return sum /(P+Q - sum);
}

function Dice(d1, d2){
    var sum = 0,
        P   = 0,
        Q   = 0;

    for(var i = 0; i < d1.length; i++){
        sum += d1[i]*d2[i];
        P   += d1[i]*d1[i];
        Q   += d2[i]*d2[i];
    }
    return 2*sum /(P+Q);
}

//L2 family
function Square_Euclidean(d1, d2){
    var sum     = 0;
    for(var i =0, l = d1.length; i < l; i++)
        sum     +=  Math.pow(d1[i] - d2[i], 2);
    return sum
}

//Shannon's entropy family
function Kullback_Leibler(d1, d2){
    var D1   = 0.0,
        D2   = 0.0,
        sum  = 0.0;
    $.each(d1,function(i, d){
        D1 += d; 
    });

    $.each(d2,function(i, d){
        D2 += d;
    })

    for(var i = 0; i < d1.length; i++){
        sum += (d1[i]/D1)*Math.log((d1[i]/D1) /(d2[i]/D2));
    }
    return sum
}

function K_Divergence(d1, d2){
    var D1   = 0.0,
        D2   = 0.0,
        sum  = 0.0;

    $.each(d1,function(i, d){
        D1 += d; 
    });

    $.each(d2,function(i, d){
        D2 += d;
    });
    for(var i = 0; i < d1.length; i++){
        sum += (d1[i]/D1)*Math.log((d1[i]/D1)*2/((d1[i]/D1) + (d2[i]/D2)));
    }
    return sum
}


// Fidelity family
function Hellinger(d1, d2){
    var sum = 0;
    for(var i = 0, l = d1.length; i < l; i ++){
        sum += Math.pow((Math.sqrt(d1[i]) - Math.sqrt(d2[i])),2);
    }
    return Math.sqrt(sum*2);
}

function Bhattacharyya(d1, d2){
    var D1   = 0.0,
        D2   = 0.0,
        sum  = 0.0;

    $.each(d1,function(i, d){
        D1 += d; 
    });

    $.each(d2,function(i, d){
        D2 += d;
    })

    for(var i = 0, l = d1.length; i < l; i++){
        sum += Math.sqrt((d1[i]/D1) * (d2[i]/D2));
    }
    return -Math.log(sum)
}
