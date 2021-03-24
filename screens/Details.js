import "react-native-gesture-handler";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

const data = [
  { id: 1, el: "Element 1" },
  { id: 2, el: "Element 2" },
  { id: 3, el: "Element 3" },
  { id: 4, el: "Element 4" },
  { id: 5, el: "Element 5" },
  { id: 6, el: "Element 6" },
  { id: 7, el: "Element 7" },
  { id: 8, el: "Element 8" },
  { id: 9, el: "Element 9" },
  { id: 10, el: "Element 10" },
  { id: 11, el: "Element 11" },
  { id: 12, el: "Element 12" },
  { id: 13, el: "Element 13" },
  { id: 14, el: "Element 14" },
  { id: 15, el: "Element 15" },
  { id: 16, el: "Element 16" },
  { id: 17, el: "Element 17" },
  { id: 18, el: "Element 17" },
  { id: 19, el: "Element 18" },
  { id: 20, el: "Element 19" },
  { id: 21, el: "Element 20" },
  { id: 22, el: "Element 21" },
  { id: 23, el: "Element 22" },
  { id: 24, el: "Element 23" },
  { id: 25, el: "Element 24" },
  { id: 26, el: "Element 24" },
  { id: 27, el: "Element 25" },
  { id: 28, el: "Element 26" },
  { id: 29, el: "Element 27" },
  { id: 30, el: "Element 28" },
];

export default function Details() {
  const [scrollViewPosition, setScrollViewPosition] = useState(0);
  const [layoutHeadings, setLayoutHeadings] = useState([]);
  const [scrollUpVal, setScrollUpVal] = useState(0);
  const [scrollDownVal, setScrollDownVal] = useState(0);

  const scrollToRef = useRef(null);

  const handeScroll = useCallback((event) => {
    setScrollViewPosition(event.nativeEvent.contentOffset.y);
  }, []);

  const setHeadings = (newHeading) => {
    setLayoutHeadings([...layoutHeadings, newHeading]);
  };

  const getLayout = (event, i) => {
    const { layout } = event.nativeEvent;
    setHeadings({
      yDirection: layout.y,
      index: i,
    });
  };

  const yDirections = layoutHeadings.map((el) => el.yDirection);

  const closestLeft = Math.max(
    ...yDirections.filter((v) => v < scrollViewPosition)
  );
  const closestRight = Math.min(
    ...yDirections.filter((v) => v > scrollViewPosition)
  );

  const scrollTo = useCallback((scrollValue) => {
    if (scrollValue !== Infinity) {
      scrollToRef.current?.scrollTo({
        y: scrollValue,
        animated: false,
      });
    }
  }, []);

  useEffect(() => {
    if (closestLeft !== -Infinity) {
      setScrollUpVal(closestLeft);
    } else {
      setScrollUpVal(0);
    }

    if (closestRight !== Infinity) {
      setScrollDownVal(closestRight);
    } else {
      setScrollDownVal(0);
    }
  }, [scrollViewPosition, closestLeft, closestRight]);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          ref={scrollToRef}
          scrollEventThrottle={160}
          onScroll={handeScroll}
          onScrollEndDrag={handeScroll}
        >
          {data.map((item, i) => (
            <View key={item.id} onLayout={(event) => getLayout(event, i)}>
              <Card>
                <Card.Title> {item.el} </Card.Title>
                <Card.Divider />
                <Card.FeaturedTitle style={{ color: "#000" }}>
                  Featured title: {item.id}
                </Card.FeaturedTitle>
                <Card.FeaturedSubtitle style={{ color: "#000" }}>
                  Featured subtitle: {item.id}
                </Card.FeaturedSubtitle>
                <Card.Divider />
                <Card.Image
                  source={{ uri: "https://picsum.photos/200/300" }}
                ></Card.Image>
                <Text style={{ marginBottom: 10 }}>
                  The idea with React Native Elements is more about component
                  structure than actual design.
                </Text>
                <Button
                  icon={<Icon name="code" color="#ffffff" />}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="VIEW NOW"
                />
              </Card>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          position: "absolute",
          right: 5,
          bottom: 80,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Button
          icon={<Icon name="expand-less" color="#fff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            console.log("Press up");
            scrollTo(scrollUpVal);
          }}
        />
        <View style={{ height: 40 }} />
        <Button
          icon={<Icon name="expand-more" color="#fff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            console.log("Press down");
            scrollTo(scrollDownVal);
          }}
        />
      </View>
    </>
  );
}
