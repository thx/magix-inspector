//#snippet;
//#exclude(loader)
let IdePort = {
    '@{openUrlPromise}'(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.responseText) {
                    if(xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(`Network failed(${xhr.status}): ${url}`));
                    }
                }
            };
            xhr.send();
        });
    },
    '@{connectAllPromise}'(inputHostname, ...files) {
        IdePort['@{getURLPromise}'](inputHostname)
            .then(function(determinedURL) {
                return Promise.all(files.map(file => {
                    return IdePort['@{openUrlPromise}'](determinedURL + encodeURIComponent(file));
                }));
            })
            .then(function(determinedURL) {
                console.info(`Files(${files.length}) all opened.`);
            })
            .catch(err => console.error(err));
    },
    '@{getURLPromise}'(inputHostname) {
        if(IdePort.determinedURL && IdePort.determinedBase == inputHostname) {
            return Promise.resolve(IdePort.determinedURL);
        }
        return IdePort['@{determineIDEServiceURLPromise}'](inputHostname);
    },
    async '@{determineIDEServiceURLPromise}'(inputHostname) {
        const MAX_TRIAL = 3;
        let trials = 0;
        let port = hashStr(inputHostname, 8192) + 32768,
            location,
            determinedURL;
        do {
            location = `http://127.0.0.1:${port}/`;
            try {
                let responseHostname = await IdePort['@{openUrlPromise}'](location);
                if(responseHostname != inputHostname) {
                    throw ''; 
                }
                determinedURL = location + 'open?link=';
            } catch(err) { }
            trials++;
            port++;
        } while(!determinedURL && trials < MAX_TRIAL);
    
        if(!determinedURL) {
            throw new Error(`Cannot find available port within range: ${port - MAX_TRIAL} ~ ${port}`);
        }
        
        IdePort.determinedBase = inputHostname;
        IdePort.determinedURL = determinedURL;
    
        return determinedURL;
    
        function hashStr(str, max) {
            // SDBM Algorithm from http://www.cse.yorku.ca/~oz/hash.html
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
            }
            hash = hash >>> 0;
            max && (hash %= max);
            return hash;
        }
    }
};

// Tested in Browser:
// IdePort["@{determineIDEServiceURLPromise}"]('dianjiang.di.taobao.com');
