import socket,struct

# In Python 3+, you can simply use range
# In Python 2, you can substitute xrange if you're only dealing with IPv4
def _range(a, b):
    while a<b:
        yield a
        a+=1

def addrRange(start,end,fam=socket.AF_INET):
    famFmt = '!I' if fam == socket.AF_INET else '!Q'
    addr2int = lambda a: struct.unpack(famFmt, socket.inet_pton(fam, a))[0]

    for ai in _range(addr2int(start), addr2int(end)+1):
        yield socket.inet_ntop(fam, struct.pack(famFmt, ai))

for a in addrRange('192.55.22.0', '192.56.22.0'):
    print(a) # Or do something with the address