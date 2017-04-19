import java.lang.Math.*;
public class Subdir {
  /**
  *This function tells whether an integer is prime.
  *It demonstrates an inefficient way of checking.
  */
  public boolean isPrimeBad(int n) {
    if (n < 2) //All integers less than 2 are prime.
      return false;
    for(int i = 2; i < n; i ++) {
      if(n%i == 0) //n is divisible by i
        return false;
    }
    return true; 
  }
  /**
  *This is a better implementation. 
  *It checks only till half n and eliminates even numbers first. 
  */
  public boolean isPrimeBetter(int n) {
    if (n < 2)
      return false;
    if(n == 2) // 2 is prime
      return true;
    if (n%2 == 0) // but all other even numbers aren't
      return false;
    for(int i = 3; i < n/2; i+=2) { //needn't check with even numbers
      if(n%i == 0)
        return false;
    }
    return true;
  }
  /**
  *This is a reasonable implementation of isPrime.
  *It combines the previous strategy with checking 
  *till sqrt(n)
  */
  public boolean isPrimeGood(int n) {
    if (n < 2)
      return false;
    if(n == 2) 
      return true;
    if (n%2 == 0) 
      return false;
    for(int i = 3; i < Math.sqrt(n); i+=2) { //checks fewer numbers
      if(n%i == 0)
        return false;
    }
    return true;
  }
}