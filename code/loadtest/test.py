import os
 
def main(dirname):
    # begin
    for root, dirs, files in os.walk(dirname):
        print(root)
        print(dirs)
        print(files)
        for dir in dirs:
            print(os.path.join(root, dir))
        for file in files:
            print("!!!!!!!!"+os.path.join(root, file))
        print('----------------')
 
 
if __name__ == '__main__':
    main(r'/home/wzl/sjtu/22/se/bamdb/SE231/code/loadtest')
