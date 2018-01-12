/*
 * Copyright (c) 2016 Razeware LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import UIKit

protocol AnnotationViewDelegate {
  func didTouch(annotationView: AnnotationView)
}


class AnnotationView: ARAnnotationView {
  var titleLabel: UILabel?
  var distanceLabel: UILabel?
  var label2: UILabel?
  var delegate: AnnotationViewDelegate?
  var stores = [String:[Friend]]()
  var imageView: UIImageView?
  
  override func didMoveToSuperview() {
    super.didMoveToSuperview()
    
    loadUI()
  }
  
  func loadUI() {
    titleLabel?.removeFromSuperview()
    distanceLabel?.removeFromSuperview()
    label2?.removeFromSuperview()
    
    

    let label = UILabel(frame: CGRect(x: 10, y: 0, width: self.frame.size.width, height: 30))
    label.font = UIFont.systemFont(ofSize: 16)
    label.numberOfLines = 0
    label.backgroundColor = UIColor(white: 0.7, alpha: 0.7)
    label.textColor = UIColor.white
    self.addSubview(label)
    self.titleLabel = label
    
    let label1 = UILabel(frame: CGRect(x: 10, y: 50, width: self.frame.size.width, height: 30))
    label1.font = UIFont.systemFont(ofSize: 16)
    label1.numberOfLines = 0
    label1.backgroundColor = UIColor(white: 0.7, alpha: 0.7)
    label1.textColor = UIColor.white
    self.addSubview(label1)
    self.label2 = label1
    
    distanceLabel = UILabel(frame: CGRect(x: 10, y: 30, width: self.frame.size.width, height: 20))
    distanceLabel?.backgroundColor = UIColor(white: 0.3, alpha: 0.7)
    distanceLabel?.textColor = UIColor.green
    distanceLabel?.font = UIFont.systemFont(ofSize: 12)
    self.addSubview(distanceLabel!)
    
    //friendImages = [UIImageView]()
    //var images: [UIImage] = []
//    for friend in friends{
//      if (hasFriendHere(friend)){
//        images.append(friend.image)
//      }
//    }
    
//    for friend in stores["Giant Food"]!{
//       print("THIS ONE ************ " + friend.name)
//    }
    

    
    var photoName = ""
    var totalCash=0.0
    if let annotation = annotation as? Place {
      titleLabel?.text = annotation.placeName
      distanceLabel?.text = String(format: "%.2f km", annotation.distanceFromUser / 1000)
      var friendsString = ""
      var latestFriend: Friend?
      var latestDate = ""
      var hasFirst = true
      for friend in annotation.friends {
        if (hasFirst){
          latestFriend = friend
          hasFirst = false
          photoName.append(friend.name )
        }
        for transaction in friend.trans!{
          if transaction.storeName == annotation.placeName{
            if totalCash == 0{
              totalCash = Double(transaction.amount)
            }
              break
          }
        }
      }
      label2?.text = "Cash Spent: " + String(totalCash)
//      if self.stores[transaction.time]? > latestDate
    }
    
    photoName.append(".jpeg")
    print(photoName)
    let imageName = photoName
    let image = UIImage(named: imageName)
    if image != nil{
      let imageView = UIImageView(image: image!)
      imageView.frame = CGRect(x: 10, y: 70, width: 30, height: 30)
      self.addSubview(imageView)
    }
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    titleLabel?.frame = CGRect(x: 10, y: 0, width: self.frame.size.width, height: 30)
    distanceLabel?.frame = CGRect(x: 10, y: 30, width: self.frame.size.width, height: 20)
//    friendTotal?.frame = CGRect(x: 10, y: 50, width: 30, height: 20)
    label2?.frame = CGRect(x: 10, y: 50, width: self.frame.size.width, height: 20)
    imageView?.frame = CGRect(x: 10, y: 250, width: 100, height: 100)
  }
  
  override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    delegate?.didTouch(annotationView: self)
  }
}
