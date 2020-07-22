#include <stdio.h>
#include <sys/uio.h>
#include <stdlib.h>

#define WASM_EXPORT __attribute__((visibility("default")))



/* External function that is implemented in JavaScript. */
extern void putc_js(char c);

/* Basic implementation of the writev sys call. */ 
WASM_EXPORT
size_t writev_c(int fd, const struct iovec *iov, int iovcnt) {
  size_t cnt = 0;
  for (int i = 0; i < iovcnt; i++) {
    for (int j = 0; j < iov[i].iov_len; j++) {
      putc_js(((char *)iov[i].iov_base)[j]);
    }
    cnt += iov[i].iov_len;
  }
  return cnt;
}









struct node  
{ 
    char val; 
    struct node *left; 
    struct node *right; 
}; 

unsigned long int counter = 0;

struct node* rootNode = NULL;

struct node* newNode(char val, struct node *left, struct node *right) 
{ 
  // Allocate memory for new node  
  struct node* node = (struct node*)malloc(sizeof(struct node)); 
  
  // Assign data to this node 
  node->val = val; 
  
  // Initialize left and right children as NULL 
  node->left = left; 
  node->right = right; 
  return(node); 
};


char * find(char val[], struct node * nodeVal ){
    
    char *valueReturned = NULL;
    
    if (nodeVal->left) {
        valueReturned = find(val, nodeVal->left);
        if (
            valueReturned 
            && *valueReturned == *val 
            && *valueReturned < 27 
            && ((nodeVal->left->val) + *valueReturned) < 27 
            && !nodeVal->right) {
            nodeVal->right = newNode(nodeVal->left->val + *valueReturned, NULL, NULL);
            return NULL;
        } 
    } else {
        nodeVal->left = newNode(*val, NULL, NULL);
        return val;
    }

    if (nodeVal->right) {

        valueReturned = find(val, nodeVal->right);
        return NULL;
    }
    
    

    
};

/*;*/



void countPossibleStrings (struct node *node)
{
    //printf("Count: %d  ", counter);

    if(node->left){

        countPossibleStrings(node->left);

    } 
    else{

        ++counter;
        //printf("final counted: %d \n", counter);

        return;
    }
    
    if(node->right){
        countPossibleStrings(node->right);
    };
    return; 
};

WASM_EXPORT
int getCount(){
    counter=0;
    countPossibleStrings(rootNode);
    return counter;
};

WASM_EXPORT
void possibleStrings( char *str){
    
    char val[3];
    char tempChar = 224;
    rootNode = newNode(224, NULL, NULL);
    
          while(*str){
              val[1] = *str;
              val[2] = '\0';
              val[3] = '\0';
            //   printf("%s", *val);
              tempChar = *str;
              if (*(str+1)!= '0') {
                    find(val, rootNode);
             
                } else {
                     ++str;
                    val[2]= *str;
                    find(val, rootNode);
                }
              ++str;
          };

};

WASM_EXPORT
int getPossibleStrCount(char a[]){
      int c = 0;
      possibleStrings(a);
      c = getCount();
      return c;
}
WASM_EXPORT
char * getStr(char a[]){
      printf(" \n %s ", a);
      return a;
}

// int main(void) {
//   printf("Hello World\n");
// }
WASM_EXPORT
int main()
{
    // printf("Hello, World!\n");
    char num = 1;
    unsigned long int count = 0;
/*    char *cc = "hello N";
    char val= *cc;
    
    char *val2 = cc+1; 
    char arr [5] = "p";

    
    printf("\n%d\n",num);
    printf("\n%d\n","\0");
    printf("%d\n",val);
    printf("%c\n",*val2);
    printf("%d\n",*val2);*/
    possibleStrings("1111111111111111111111111111111111111");
    count = getCount();
    
    printf("\n\n\n\nCount:: %d\n",count);

    return count;
};






