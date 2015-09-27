require 'spec_helper'

describe "Posts" do
  before do
    @post = Post.create :title => 'First Post', :content => 'first content'
  end
  describe "GET /posts" do
    it "display some posts" do
      visit posts_path
      expect(page).to have_content 'First Post' 
    end
    
    it "create a new post" do
      visit posts_path
      fill_in 'post_title', :with => 'Second Post'
      fill_in 'post_content', :with => 'second content'
      click_button 'Create Post'
      
      current_path == posts_path
      expect(page).to have_content 'Second Post'

    end
  end
  describe "PUT /posts" do
    it "edits a post" do
      visit posts_path
      click_link 'Edit'

      expect(current_path).to eq edit_post_path(@post)
      
      expect(find_field('post_title').value).to eq 'First Post'
      fill_in 'post_title', :with => 'Updated Post'
      click_button 'Update Post'
      
      expect(current_path).to eq posts_path

      expect(page).to have_content 'Updated Post'
    end
    
    it "should not update an empty post" do
      visit posts_path
      click_link 'Edit'
      
      fill_in 'post_title', :with => ''
      click_button 'Update Post'
      
      expect(current_path).to eq edit_post_path(@post)
      expect(page).to have_content 'There was an error updating your post.'
    end
  end

  describe "DELETE /posts" do
    it "should delete a post" do
      visit posts_path
      find("#post_#{@post.id}").click_link 'Delete'
      expect(page).to have_content 'Post has been deleted'
      expect(page).to have_no_content 'First Post'
      
    end
  end
end
