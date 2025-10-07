import {View, Text, StyleSheet, FlatList, RefreshControl} from "react-native";
import {IPost} from "@shared/models";
import {materialColors} from "@utils/colors";
import PostItem from "@app/tabs/screens/posts/post-item";
import {useState} from "react";
import {POSTS} from "@utils/dummy-data";
import {PostHeader} from "@app/tabs/screens/posts/post-header";


export default function Posts() {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [posts, setPosts] = useState<IPost[]>(POSTS)
  const handleOnReachEnd = () => {
    console.log('End reached triggered')
    const postsCopy = [...posts]
    const newId = postsCopy.length + 1
    postsCopy.push({
      id: newId,
      user: `Usuario ${newId}`,
      imageUrl: `https://picsum.photos/id/${newId}/800/1200`,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque diam purus, lacinia elementum bibendum sollicitudin, accumsan sed nisl. Sed viverra aliquam velit in tristique. Integer fermentum aliquet ultricies. Nullam iaculis sodales eros, et viverra metus fermentum eu. Sed id urna ac metus iaculis posuere. Mauris vitae bibendum sapien, congue iaculis massa. Etiam congue metus vel interdum hendrerit. Donec sapien turpis, dictum nec consequat quis, ornare non nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus posuere mattis turpis id blandit.",
      likes: 0,
      comments: [],
      distance: 5
    })
    setPosts(postsCopy)
  }

  const handleOnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  const handlePostHeaderPress = () => {
    console.log('Post header pressed')
  }

  return (
      <View style={styles.container}>
        <FlatList
            ListHeaderComponent={() => <PostHeader onPress={handlePostHeaderPress}/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh}
                                            tintColor={materialColors.schemes.light.primary}
                                            colors={[materialColors.schemes.light.primary, materialColors.schemes.light.secondary, materialColors.schemes.light.tertiary]}/>}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Text>No places found</Text>}
            onScrollToTop={() => console.log('Scroll to top')}
            onEndReached={handleOnReachEnd}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={{height: 16}}/>}
            data={posts} renderItem={(data) => <PostItem item={data.item}/>}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surfaceContainer,
  }
})