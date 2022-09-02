import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
 stable var currentValue : Float = 300;
  // currentValue := 100;

  let id = 1;

  stable var startTime = Time.now();
  // startTime := Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withDraw(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if(tempValue >= 0){
    currentValue -= amount;
    Debug.print(debug_show(currentValue));
    } else {
    Debug.print("Something went wrong!");
    }
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound(){
    var currentTime = Time.now();
    var timeElapsedS = currentTime - startTime;
    var timeElapsedInS = timeElapsedS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedInS));
    startTime := currentTime;
  };
}
