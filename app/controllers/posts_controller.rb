class PostsController < ApplicationController
  def index
    @post = Post.new
    @posts = Post.all.reverse
    respond_to do |format|
      format.json { render json: @posts }
      format.html { render :index }
    end
  end
  
  def create
    post=Post.create post_params
    render status: :ok, json: post.to_json
  end

  def edit
    @post = Post.find id_params 
  end

  def update
    post = Post.find id_params
    if post.update_attributes post_params
      redirect_to posts_path, :notice => 'Your post has successfully been updated'
    else
      redirect_to :back, :notice => 'There was an error updating your post.'
    end
  end

  def destroy
    Post.find(id_params).destroy
    redirect_to :back, :notice => 'Post has been deleted.' 
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end

  def id_params
    params.require(:id)
  end
end
