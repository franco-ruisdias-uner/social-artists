import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import {IPost} from "@shared/models";
import {materialColors} from "@utils/colors";
import PostItem from "@app/tabs/screens/posts/post-item";
import {useEffect, useState} from "react";
import {PostHeader} from "@app/tabs/screens/posts/post-header";
import axiosClient from "@core/api";
import {Pagination} from "@shared/interfaces";
import {PaginatedResponse} from "@shared/interfaces/pagination";


export default function Posts() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pagination, setPagination] = useState<Pagination>({page: 1, limit: 10});
  const [hasMorePages, setHasMorePages] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getPosts = () => {
    setLoading(true)
    axiosClient.get<PaginatedResponse<IPost>>('/posts', {params: pagination})
        .then(response => {
          const {data} = response;
          setPosts(data.data);
          setHasMorePages(data.meta.totalPages > pagination.page);
        })
        .catch(error => {
          if (error.response.data) {
            setError(error.response.data.message);
          }
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        })
  }


  const handleOnReachEnd = () => {

    if (hasMorePages) {
      console.log('End reached triggered')
      setPagination({
        ...pagination,
        page: pagination.page + 1,
      })
    }

  }

  const handleOnRefresh = () => {
    setRefreshing(true);
    getPosts();
  }

  const handlePostHeaderPress = () => {
    console.log('Post header pressed')
  }

  useEffect(() => {
    getPosts();
  }, [pagination]);

  return (
      <View style={styles.container}>
        <FlatList
            ListHeaderComponent={() => <PostHeader/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh}
                                            tintColor={materialColors.schemes.light.primary}
                                            colors={[materialColors.schemes.light.primary, materialColors.schemes.light.secondary, materialColors.schemes.light.tertiary]}/>}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              if (loading) {
                return <ActivityIndicator/>
              }

              return <Text>{error ? error : 'No se encontraron Posts!'}</Text>
            }}
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